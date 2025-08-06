from flask import Blueprint, request, jsonify, stream_template
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
import os
import json

ai_chat_bp = Blueprint('ai_chat', __name__)

# Initialize AI models
def get_gemini_model():
    """Initialize Gemini model with API key from environment"""
    api_key = os.getenv('GOOGLE_API_KEY', 'your-google-api-key-here')
    return ChatGoogleGenerativeAI(
        model="gemini-pro",
        google_api_key=api_key,
        temperature=0.7
    )

def get_groq_model():
    """Initialize Groq model with API key from environment"""
    api_key = os.getenv('GROQ_API_KEY', 'your-groq-api-key-here')
    return ChatGroq(
        groq_api_key=api_key,
        model_name="mixtral-8x7b-32768",
        temperature=0.7
    )

# Spiritual guidance system prompt
SPIRITUAL_SYSTEM_PROMPT = """You are a compassionate AI spiritual companion designed to provide biblical guidance, encouragement, and support. Your role is to:

1. Offer wisdom rooted in Christian faith and biblical principles
2. Provide comfort and encouragement during difficult times
3. Share relevant scripture verses when appropriate
4. Guide users in prayer and spiritual reflection
5. Help users grow in their relationship with God
6. Be empathetic, non-judgmental, and loving

Guidelines:
- Always respond with love, grace, and biblical truth
- Use scripture to support your guidance when relevant
- Encourage prayer and seeking God's will
- Be sensitive to different denominational backgrounds
- Avoid giving medical, legal, or professional counseling advice
- Direct users to professional help when needed
- Keep responses encouraging and hope-filled

Remember: You are here to point people toward God's love, grace, and truth."""

@ai_chat_bp.route('/chat', methods=['POST'])
def chat():
    """Handle chat requests with AI spiritual guidance"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        provider = data.get('provider', 'gemini')  # Default to Gemini
        context = data.get('context', '')  # Optional context from previous conversations
        
        # Choose AI model based on provider
        if provider == 'groq':
            model = get_groq_model()
        else:
            model = get_gemini_model()
        
        # Create the prompt template
        prompt = ChatPromptTemplate.from_messages([
            ("system", SPIRITUAL_SYSTEM_PROMPT),
            ("human", "{context}\n\nUser: {message}")
        ])
        
        # Create the chain
        chain = prompt | model
        
        # Prepare context string
        context_str = f"Previous context: {context}" if context else ""
        
        # Get AI response
        response = chain.invoke({
            "context": context_str,
            "message": user_message
        })
        
        return jsonify({
            'response': response.content,
            'provider': provider,
            'timestamp': str(int(os.times().elapsed * 1000))  # Current timestamp
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'An error occurred while processing your request',
            'details': str(e)
        }), 500

@ai_chat_bp.route('/chat/stream', methods=['POST'])
def chat_stream():
    """Handle streaming chat requests for real-time responses"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message']
        provider = data.get('provider', 'gemini')
        context = data.get('context', '')
        
        # Choose AI model
        if provider == 'groq':
            model = get_groq_model()
        else:
            model = get_gemini_model()
        
        # Create prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system", SPIRITUAL_SYSTEM_PROMPT),
            ("human", "{context}\n\nUser: {message}")
        ])
        
        chain = prompt | model
        context_str = f"Previous context: {context}" if context else ""
        
        def generate():
            try:
                # Stream the response
                for chunk in chain.stream({
                    "context": context_str,
                    "message": user_message
                }):
                    if hasattr(chunk, 'content'):
                        yield f"data: {json.dumps({'content': chunk.content, 'provider': provider})}\n\n"
                
                yield f"data: {json.dumps({'done': True})}\n\n"
                
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        return app.response_class(
            generate(),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            }
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_chat_bp.route('/chat/quick-responses', methods=['GET'])
def get_quick_responses():
    """Get predefined quick response options for spiritual guidance"""
    quick_responses = [
        {
            'id': 'peace',
            'text': 'I need peace',
            'prompt': 'I am feeling anxious and overwhelmed. Can you help me find God\'s peace?'
        },
        {
            'id': 'strength',
            'text': 'Need strength',
            'prompt': 'I am going through a difficult time and need spiritual strength. Can you encourage me?'
        },
        {
            'id': 'forgiveness',
            'text': 'About forgiveness',
            'prompt': 'I am struggling with forgiveness. Can you help me understand God\'s perspective on forgiveness?'
        },
        {
            'id': 'growth',
            'text': 'Spiritual growth',
            'prompt': 'I want to grow closer to God. What practical steps can I take in my spiritual journey?'
        },
        {
            'id': 'purpose',
            'text': 'Finding purpose',
            'prompt': 'I feel lost and unsure about my purpose. Can you help me understand God\'s plan for my life?'
        },
        {
            'id': 'prayer',
            'text': 'Help with prayer',
            'prompt': 'I want to improve my prayer life. Can you guide me on how to pray more effectively?'
        }
    ]
    
    return jsonify({'quick_responses': quick_responses})

@ai_chat_bp.route('/chat/scripture', methods=['POST'])
def get_scripture_guidance():
    """Get scripture-based guidance for specific topics"""
    try:
        data = request.get_json()
        topic = data.get('topic', '')
        
        if not topic:
            return jsonify({'error': 'Topic is required'}), 400
        
        # Use AI to find relevant scripture and provide guidance
        model = get_gemini_model()
        
        prompt = f"""As a spiritual companion, provide guidance on the topic of "{topic}" by:
        1. Sharing 2-3 relevant Bible verses with references
        2. Explaining how these verses apply to this topic
        3. Offering practical spiritual advice
        4. Suggesting a short prayer related to this topic
        
        Format your response as JSON with the following structure:
        {{
            "topic": "{topic}",
            "verses": [
                {{"reference": "Book Chapter:Verse", "text": "verse text"}},
                ...
            ],
            "explanation": "explanation text",
            "practical_advice": "practical advice text",
            "prayer": "suggested prayer text"
        }}
        """
        
        response = model.invoke([HumanMessage(content=prompt)])
        
        # Try to parse as JSON, fallback to plain text if needed
        try:
            guidance = json.loads(response.content)
        except:
            guidance = {
                "topic": topic,
                "response": response.content,
                "error": "Could not parse structured response"
            }
        
        return jsonify(guidance)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

