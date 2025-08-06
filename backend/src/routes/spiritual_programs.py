from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime, timedelta
import random

spiritual_programs_bp = Blueprint('spiritual_programs', __name__)

# Sample spiritual content data
DEVOTION_TOPICS = {
    'stress': {
        'title': 'Dealing with Stress',
        'category': 'Mental Health',
        'scripture': {
            'reference': 'Philippians 4:6-7',
            'text': 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
        },
        'prayer': 'Lord, help me release my anxieties about dealing with stress and trust in You. Grant me Your peace that surpasses all understanding.',
        'declaration': 'God is my refuge and strength, and I will not be shaken by life\'s challenges.',
        'reflection': 'Today\'s devotion reminds us that God cares about every aspect of our lives, including our struggles with dealing with stress. When we bring our concerns to Him in prayer, He promises to give us peace that goes beyond human understanding.',
        'video': {
            'title': 'Overcoming Dealing with Stress with God\'s Promises',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'fear': {
        'title': 'Overcoming Fear',
        'category': 'Courage',
        'scripture': {
            'reference': 'Isaiah 41:10',
            'text': 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.'
        },
        'prayer': 'Heavenly Father, when fear tries to overwhelm me, remind me that You are always with me. Give me courage to face each day with faith.',
        'declaration': 'I will not fear, for God is with me and He will strengthen and help me.',
        'reflection': 'Fear is a natural human emotion, but God calls us to trust in His presence and power. When we remember that the Creator of the universe is on our side, we can face any challenge with confidence.',
        'video': {
            'title': 'Walking in Faith, Not Fear',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'depression': {
        'title': 'Conquering Depression',
        'category': 'Mental Health',
        'scripture': {
            'reference': 'Psalm 34:18',
            'text': 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.'
        },
        'prayer': 'Lord Jesus, in my darkest moments, help me remember that You are close to me. Heal my broken heart and restore my joy.',
        'declaration': 'God is close to me in my pain, and He will restore my joy and hope.',
        'reflection': 'Depression can make us feel isolated and hopeless, but God promises to be especially close to those who are hurting. His love and healing power can reach into our deepest pain.',
        'video': {
            'title': 'Finding Hope in Dark Times',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'relationships': {
        'title': 'Relationships',
        'category': 'Love',
        'scripture': {
            'reference': '1 Corinthians 13:4-5',
            'text': 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.'
        },
        'prayer': 'God, help me to love others the way You love me. Give me patience, kindness, and forgiveness in all my relationships.',
        'declaration': 'I choose to love others with God\'s love, showing patience, kindness, and forgiveness.',
        'reflection': 'Healthy relationships are built on the foundation of God\'s love. When we learn to love as He loves us, our relationships become sources of joy and growth.',
        'video': {
            'title': 'Building Godly Relationships',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'healing': {
        'title': 'Healing',
        'category': 'Health',
        'scripture': {
            'reference': 'Jeremiah 17:14',
            'text': 'Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.'
        },
        'prayer': 'Great Physician, I come to You seeking healing for my body, mind, and spirit. I trust in Your power to restore and renew.',
        'declaration': 'God is my healer, and I trust in His power to restore my health and wholeness.',
        'reflection': 'God cares about our physical, emotional, and spiritual well-being. While healing may come in different forms and timing, we can always trust in His love and care for us.',
        'video': {
            'title': 'Trusting God for Healing',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'purpose': {
        'title': 'Purpose & Calling',
        'category': 'Life Direction',
        'scripture': {
            'reference': 'Jeremiah 29:11',
            'text': 'For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future.'
        },
        'prayer': 'Father, help me discover and walk in the purpose You have for my life. Guide my steps and give me clarity about Your calling.',
        'declaration': 'God has a good plan for my life, and I trust Him to guide me into my purpose.',
        'reflection': 'Each of us has a unique purpose in God\'s kingdom. As we seek Him and follow His guidance, He will reveal His plans and give us the strength to fulfill our calling.',
        'video': {
            'title': 'Discovering Your God-Given Purpose',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    },
    'anxiety': {
        'title': 'Anxiety',
        'category': 'Mental Health',
        'scripture': {
            'reference': '1 Peter 5:7',
            'text': 'Cast all your anxiety on him because he cares for you.'
        },
        'prayer': 'Lord, I give You all my worries and anxious thoughts. Help me to trust in Your care and find peace in Your presence.',
        'declaration': 'I cast my anxieties on God because He cares for me and will provide for all my needs.',
        'reflection': 'Anxiety often comes from trying to control things beyond our power. When we learn to surrender our worries to God, we find the peace that comes from trusting in His perfect care.',
        'video': {
            'title': 'Overcoming Anxiety with Faith',
            'url': 'https://www.youtube.com/watch?v=example'
        }
    }
}

PRAYER_TOPICS = {
    'morning': {
        'title': 'Morning Prayer',
        'category': 'Daily Prayer',
        'structure': {
            'adoration': 'Begin by praising God for who He is',
            'confession': 'Acknowledge any sins and ask for forgiveness',
            'thanksgiving': 'Thank God for His blessings',
            'supplication': 'Present your requests and needs'
        },
        'sample_prayer': 'Heavenly Father, I praise You for Your goodness and faithfulness. As I begin this new day, I confess my need for Your guidance and forgiveness. Thank You for Your love and provision. Please guide my steps today and help me to honor You in all I do. Amen.',
        'scripture': {
            'reference': 'Psalm 5:3',
            'text': 'In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.'
        }
    },
    'evening': {
        'title': 'Evening Prayer',
        'category': 'Daily Prayer',
        'structure': {
            'reflection': 'Reflect on the day and God\'s presence',
            'gratitude': 'Express thankfulness for the day\'s blessings',
            'confession': 'Ask forgiveness for any shortcomings',
            'surrender': 'Commit your rest and tomorrow to God'
        },
        'sample_prayer': 'Lord, as this day comes to an end, I thank You for Your presence with me. I\'m grateful for Your blessings and provision. Please forgive me where I have fallen short. I commit my rest to You and trust You with tomorrow. Amen.',
        'scripture': {
            'reference': 'Psalm 4:8',
            'text': 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.'
        }
    },
    'intercession': {
        'title': 'Intercessory Prayer',
        'category': 'Prayer for Others',
        'structure': {
            'family': 'Pray for family members and their needs',
            'friends': 'Lift up friends and their situations',
            'community': 'Pray for your local community and leaders',
            'world': 'Intercede for global needs and missions'
        },
        'sample_prayer': 'Father, I lift up my family and friends to You. Please bless them, protect them, and draw them closer to You. I pray for my community leaders and for wisdom in their decisions. I also pray for those around the world who are suffering and in need of Your hope. Amen.',
        'scripture': {
            'reference': '1 Timothy 2:1',
            'text': 'I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people.'
        }
    }
}

MEDITATION_TOPICS = {
    'peace': {
        'title': 'Finding Peace',
        'category': 'Peace',
        'scripture': {
            'reference': 'John 14:27',
            'text': 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.'
        },
        'meditation_guide': [
            'Find a quiet place and sit comfortably',
            'Close your eyes and take three deep breaths',
            'Slowly read the scripture verse three times',
            'Focus on the phrase "my peace I give you"',
            'Imagine Jesus speaking these words directly to you',
            'Breathe in peace, breathe out anxiety',
            'Rest in God\'s presence for 5-10 minutes',
            'End with a prayer of gratitude'
        ],
        'reflection_questions': [
            'What areas of my life need God\'s peace?',
            'How can I receive and rest in the peace Jesus offers?',
            'What would change if I truly believed God\'s peace is available to me?'
        ]
    },
    'gratitude': {
        'title': 'Cultivating Gratitude',
        'category': 'Thankfulness',
        'scripture': {
            'reference': '1 Thessalonians 5:18',
            'text': 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.'
        },
        'meditation_guide': [
            'Sit quietly and center yourself in God\'s presence',
            'Reflect on the scripture about giving thanks',
            'Think of three specific things you\'re grateful for today',
            'Consider how each blessing reflects God\'s love',
            'Spend time thanking God for His goodness',
            'Ask God to help you see more reasons for gratitude',
            'Close by praising God for who He is'
        ],
        'reflection_questions': [
            'What am I most grateful for in this season of life?',
            'How does gratitude change my perspective on challenges?',
            'How can I cultivate a more thankful heart daily?'
        ]
    }
}

ACCOUNTABILITY_AREAS = {
    'prayer_life': {
        'title': 'Prayer Life',
        'category': 'Spiritual Disciplines',
        'questions': [
            'How consistent was my prayer time this week?',
            'What did I learn about God through prayer?',
            'What challenges did I face in my prayer life?',
            'How can I improve my communication with God?'
        ],
        'scripture': {
            'reference': 'Luke 18:1',
            'text': 'Then Jesus told his disciples a parable to show them that they should always pray and not give up.'
        }
    },
    'bible_study': {
        'title': 'Bible Study',
        'category': 'Spiritual Disciplines',
        'questions': [
            'How much time did I spend in God\'s Word this week?',
            'What passage or verse spoke to me most?',
            'How did I apply what I learned to my daily life?',
            'What questions do I have about what I\'ve read?'
        ],
        'scripture': {
            'reference': '2 Timothy 3:16',
            'text': 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.'
        }
    },
    'character': {
        'title': 'Character Development',
        'category': 'Personal Growth',
        'questions': [
            'Where did I show Christ-like character this week?',
            'What areas of my character need improvement?',
            'How did I handle conflicts or difficult situations?',
            'What fruit of the Spirit did I display or struggle with?'
        ],
        'scripture': {
            'reference': 'Galatians 5:22-23',
            'text': 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.'
        }
    }
}

@spiritual_programs_bp.route('/devotions', methods=['GET'])
def get_devotions():
    """Get available devotion topics"""
    topics = []
    for key, value in DEVOTION_TOPICS.items():
        topics.append({
            'id': key,
            'title': value['title'],
            'category': value['category'],
            'description': f"5-minute Bible reading with prayer and reflection"
        })
    
    return jsonify({'topics': topics})

@spiritual_programs_bp.route('/devotions/<topic_id>', methods=['GET'])
def get_devotion(topic_id):
    """Get specific devotion content"""
    if topic_id not in DEVOTION_TOPICS:
        return jsonify({'error': 'Devotion topic not found'}), 404
    
    devotion = DEVOTION_TOPICS[topic_id].copy()
    devotion['id'] = topic_id
    
    return jsonify({'devotion': devotion})

@spiritual_programs_bp.route('/prayers', methods=['GET'])
def get_prayers():
    """Get available prayer topics"""
    topics = []
    for key, value in PRAYER_TOPICS.items():
        topics.append({
            'id': key,
            'title': value['title'],
            'category': value['category'],
            'description': f"Structured prayer using the {value['title'].lower()} model"
        })
    
    return jsonify({'topics': topics})

@spiritual_programs_bp.route('/prayers/<topic_id>', methods=['GET'])
def get_prayer(topic_id):
    """Get specific prayer content"""
    if topic_id not in PRAYER_TOPICS:
        return jsonify({'error': 'Prayer topic not found'}), 404
    
    prayer = PRAYER_TOPICS[topic_id].copy()
    prayer['id'] = topic_id
    
    return jsonify({'prayer': prayer})

@spiritual_programs_bp.route('/meditations', methods=['GET'])
def get_meditations():
    """Get available meditation topics"""
    topics = []
    for key, value in MEDITATION_TOPICS.items():
        topics.append({
            'id': key,
            'title': value['title'],
            'category': value['category'],
            'description': f"Scripture focus with reflection and breathing guides"
        })
    
    return jsonify({'topics': topics})

@spiritual_programs_bp.route('/meditations/<topic_id>', methods=['GET'])
def get_meditation(topic_id):
    """Get specific meditation content"""
    if topic_id not in MEDITATION_TOPICS:
        return jsonify({'error': 'Meditation topic not found'}), 404
    
    meditation = MEDITATION_TOPICS[topic_id].copy()
    meditation['id'] = topic_id
    
    return jsonify({'meditation': meditation})

@spiritual_programs_bp.route('/accountability', methods=['GET'])
def get_accountability():
    """Get available accountability areas"""
    areas = []
    for key, value in ACCOUNTABILITY_AREAS.items():
        areas.append({
            'id': key,
            'title': value['title'],
            'category': value['category'],
            'description': f"Strength through scripture and truth declarations"
        })
    
    return jsonify({'areas': areas})

@spiritual_programs_bp.route('/accountability/<area_id>', methods=['GET'])
def get_accountability_area(area_id):
    """Get specific accountability area content"""
    if area_id not in ACCOUNTABILITY_AREAS:
        return jsonify({'error': 'Accountability area not found'}), 404
    
    area = ACCOUNTABILITY_AREAS[area_id].copy()
    area['id'] = area_id
    
    return jsonify({'area': area})

@spiritual_programs_bp.route('/complete', methods=['POST'])
def complete_activity():
    """Mark a spiritual activity as completed"""
    try:
        data = request.get_json()
        
        required_fields = ['type', 'topic_id']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        activity = {
            'id': f"{data['type']}_{data['topic_id']}_{int(datetime.now().timestamp())}",
            'type': data['type'],
            'topic_id': data['topic_id'],
            'topic': data.get('topic', {}),
            'timestamp': datetime.now().isoformat(),
            'duration': data.get('duration', 5),  # Default 5 minutes
            'notes': data.get('notes', ''),
            'rating': data.get('rating', None)  # Optional user rating
        }
        
        return jsonify({
            'message': 'Activity completed successfully',
            'activity': activity
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@spiritual_programs_bp.route('/schedule', methods=['POST'])
def schedule_program():
    """Schedule a spiritual program for calendar integration"""
    try:
        data = request.get_json()
        
        required_fields = ['type', 'topic_id', 'time', 'duration_days']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        program = {
            'id': f"schedule_{data['type']}_{int(datetime.now().timestamp())}",
            'type': data['type'],
            'topic_id': data['topic_id'],
            'topic_title': data.get('topic_title', ''),
            'time': data['time'],  # Daily time (e.g., "07:00")
            'duration_days': data['duration_days'],  # 7, 14, or 30 days
            'start_date': data.get('start_date', datetime.now().date().isoformat()),
            'created_at': datetime.now().isoformat(),
            'status': 'active'
        }
        
        # Calculate end date
        start_date = datetime.fromisoformat(program['start_date'])
        end_date = start_date + timedelta(days=int(program['duration_days']))
        program['end_date'] = end_date.date().isoformat()
        
        return jsonify({
            'message': 'Program scheduled successfully',
            'program': program,
            'calendar_events': generate_calendar_events(program)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_calendar_events(program):
    """Generate calendar events for a scheduled program"""
    events = []
    start_date = datetime.fromisoformat(program['start_date'])
    
    for i in range(int(program['duration_days'])):
        event_date = start_date + timedelta(days=i)
        
        event = {
            'title': f"{program['type'].title()}: {program['topic_title']}",
            'date': event_date.date().isoformat(),
            'time': program['time'],
            'duration': 30,  # 30 minutes
            'description': f"Daily {program['type']} session - {program['topic_title']}",
            'type': program['type']
        }
        
        events.append(event)
    
    return events

@spiritual_programs_bp.route('/inspiration', methods=['GET'])
def get_inspiration():
    """Get daily inspiration content"""
    # This would typically come from a database or external API
    # For now, we'll return sample content
    
    inspiration_items = [
        {
            'id': 1,
            'type': 'verse',
            'title': 'God\'s Unfailing Love',
            'content': 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
            'reference': 'Zephaniah 3:17',
            'category': 'Love'
        },
        {
            'id': 2,
            'type': 'quote',
            'title': 'Faith Over Fear',
            'content': 'Faith is not the absence of fear, but the decision that something else is more important than fear.',
            'author': 'Unknown',
            'category': 'Courage'
        },
        {
            'id': 3,
            'type': 'prayer',
            'title': 'Morning Prayer',
            'content': 'Lord, as I begin this new day, I surrender my plans to You. Guide my steps, guard my heart, and help me to be a light in this world.',
            'category': 'Prayer'
        }
    ]
    
    # Shuffle and return a selection
    random.shuffle(inspiration_items)
    
    return jsonify({'inspiration': inspiration_items})

