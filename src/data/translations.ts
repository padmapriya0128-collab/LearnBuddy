export type SupportedLanguage = 'Tamil' | 'English' | 'Hindi' | 'Telugu' | 'Malayalam' | 'Kannada';

export interface TranslationDictionary {
  navbar: {
    brandTitle: string;
    aiTeacherBadge: string;
    tagline: string;
    backBtn: string;
    logoutBtn: string;
    studentPortal: string;
    changeTopic: string;
    steps: {
      login: string;
      student_details: string;
      language_selection: string;
      teacher_customization: string;
      subject_selection: string;
      topic_selection: string;
      lesson_video: string;
      teach_back: string;
      automatic_notes: string;
      interactive_games: string;
      completion: string;
    };
  };
  studentDetails: {
    stepBadge: string;
    title: string;
    desc: string;
    selectedLabel: string;
    continueBtn: string;
    backBtn: string;
    stages: {
      primary: string;
      middle: string;
      secondary: string;
      higher: string;
    };
  };
  languageSelection: {
    stepBadge: string;
    title: string;
    desc: string;
    continueBtn: string;
    backBtn: string;
    stylesHeading: string;
  };
  teacherCustomization: {
    stepBadge: string;
    title: string;
    desc: string;
    voiceHeading: string;
    listenSample: string;
    playingSample: string;
    useMyVoiceTitle: string;
    useMyVoiceDesc: string;
    recordSampleBtn: string;
    updateVoiceBtn: string;
    profileActiveBadge: string;
    personalizedStudioBadge: string;
    speedHeading: string;
    slowSpeed: string;
    normalSpeed: string;
    fastSpeed: string;
    styleHeading: string;
    teacherReady: string;
    teachingIn: string;
    continueBtn: string;
    backBtn: string;
    personas: {
      friendly: { name: string; persona: string; tone: string };
      energetic: { name: string; persona: string; tone: string };
      analytical: { name: string; persona: string; tone: string };
      gentle: { name: string; persona: string; tone: string };
    };
    styles: {
      friendly: { title: string; desc: string };
      stepByStep: { title: string; desc: string };
      practical: { title: string; desc: string };
    };
  };
  subjectSelection: {
    stepBadge: string;
    title: string;
    desc: string;
    selectedLabel: string;
    proceedMsg: string;
    standardCurriculum: string;
    continueBtn: string;
    backBtn: string;
  };
  topicSelection: {
    stepBadge: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    interactiveLesson?: string;
    interactiveBadge?: string;
    startLearningBtn: string;
    customTopicHeading: string;
    customTopicPlaceholder: string;
    teachTopicBtn: string;
    backBtn: string;
  };
  lessonPlayer: {
    stepCounter: string;
    myVoiceActive: string;
    backToTopics: string;
    myVoiceStudio: string;
    myVoiceActiveBadge: string;
    myVoiceActiveDesc: string;
    introGreetingBtn: string;
    playingIntro: string;
    currentFocus: string;
    captionsBtn: string;
    muteBtn: string;
    unmuteBtn: string;
    stepCompleted: string;
    nextStepBtn: string;
    finishToQuizBtn: string;
    previousStepBtn: string;
    replayBtn: string;
    readAloudBtn: string;
    detailedBreakdown: string;
    keySteps: string;
    coreHighlightFormula: string;
    realWorldExample: string;
    fullNarration: string;
    modalTitle: string;
    modalDesc: string;
    reviewStepsBtn: string;
    continueToQuizModalBtn: string;
    startTeachBackModalBtn: string;
    lockedQuizTooltip?: string;
    lockedQuizNotice: string;
    audioError: string;
    retryAudioBtn: string;
    videoLockedNotice: string;
  };
  teachBack: {
    stepBadge: string;
    title: string;
    desc: string;
    listening: string;
    speakPrompt: string;
    typePrompt: string;
    submitBtn: string;
    evaluating: string;
    continueNotesBtn: string;
    backToVideoBtn: string;
    scoreLabel: string;
    strengthsHeading: string;
    missingConceptsHeading: string;
    followUpHeading: string;
    clarifyingTipHeading: string;
  };
  notes: {
    stepBadge: string;
    craftedFor: string;
    backBtn: string;
    copyBtn: string;
    copiedBtn: string;
    printBtn: string;
    playQuizBtn: string;
    focusTipHeading: string;
    definition: string;
    mainConcepts: string;
    stepExplanation: string;
    importantTerms: string;
    formulasAndRules: string;
    practicalExamples: string;
    revisionPoints: string;
    summary: string;
    practiceQuestions: string;
    showAnswer: string;
    hideAnswer: string;
    hint: string;
  };
  quiz: {
    stepBadge: string;
    challengeTitle: string;
    instructions: string;
    questionCounter: string;
    scoreLabel: string;
    mcq: string;
    fillBlank: string;
    match: string;
    itemsCol: string;
    descriptionsCol: string;
    checkAnswerBtn: string;
    nextQuestionBtn: string;
    completeQuizBtn: string;
    explanationLabel: string;
    hintLabel: string;
    backToNotesBtn: string;
    correctFeedback: string;
    incorrectFeedback: string;
  };
  completion: {
    title: string;
    quizScoreLabel: string;
    accuracyLabel: string;
    statusLabel: string;
    masteredText: string;
    teacherCongrats: string;
    reviewQuizBtn: string;
    finishNextTopicBtn: string;
  };
}

const translations: Record<SupportedLanguage, TranslationDictionary> = {
  English: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'AI School Teacher',
      tagline: 'Personalized learning for every student',
      backBtn: 'Back',
      logoutBtn: 'Sign Out',
      studentPortal: 'Student Portal',
      changeTopic: 'Change Topic',
      steps: {
        login: 'Sign In',
        student_details: 'Class Selection',
        language_selection: 'Language',
        teacher_customization: 'Customize Teacher',
        subject_selection: 'Select Subject',
        topic_selection: 'Choose Topic',
        lesson_video: 'AI Lesson Video',
        teach_back: 'Teach-Back Session',
        automatic_notes: 'Revision Notes',
        interactive_games: 'Practice Quiz',
        completion: 'Completed!',
      },
    },
    studentDetails: {
      stepBadge: 'Step 1: Your Academic Grade',
      title: 'Which class are you studying in?',
      desc: 'LearnBuddy customizes lessons, vocabulary, and games to match your curriculum and grade level.',
      selectedLabel: 'Selected:',
      continueBtn: 'Continue to Language',
      backBtn: 'Back',
      stages: {
        primary: 'Primary School',
        middle: 'Middle School',
        secondary: 'Secondary School',
        higher: 'Higher Secondary',
      },
    },
    languageSelection: {
      stepBadge: 'Step 2: Language & Speaking Style',
      title: 'Choose Your Instruction Language',
      desc: 'Your AI teacher will speak, explain, and interact with you in your chosen language.',
      continueBtn: 'Continue to Teacher Customization',
      backBtn: 'Back',
      stylesHeading: 'Speaking Styles:',
    },
    teacherCustomization: {
      stepBadge: 'Step 3: Teacher Customization',
      title: 'Customize Your Teacher',
      desc: 'Choose a teacher voice, pacing, and pedagogical style that feels most natural to you.',
      voiceHeading: 'Teacher Voice',
      listenSample: 'Listen to Voice Sample',
      playingSample: 'Playing Sample...',
      useMyVoiceTitle: 'Use My Voice',
      useMyVoiceDesc: 'Record a brief voice sample to teach lessons with your personalized tone and cadence.',
      recordSampleBtn: 'Record My Voice Sample',
      updateVoiceBtn: 'Update My Voice',
      profileActiveBadge: 'Profile Active',
      personalizedStudioBadge: 'Personalized Studio',
      speedHeading: 'Speaking Speed',
      slowSpeed: '🐢 Slow',
      normalSpeed: '🚶 Normal',
      fastSpeed: '⚡ Fast',
      styleHeading: 'Teaching Style',
      teacherReady: 'Teacher Ready:',
      teachingIn: 'Teaching in',
      continueBtn: 'Continue to Subject Selection',
      backBtn: 'Back',
      personas: {
        friendly: { name: 'Miss Ananya', persona: 'Friendly School Teacher', tone: 'Warm, encouraging, and supportive' },
        energetic: { name: 'Master Arvind', persona: 'Energetic Science Mentor', tone: 'Dynamic, curious, and engaging' },
        analytical: { name: 'Prof. Raman', persona: 'Step-by-Step STEM Guide', tone: 'Calm, patient, and analytical' },
        gentle: { name: 'Ms. Priya', persona: 'Gentle Conceptual Guide', tone: 'Clear, soft, and soothing' },
      },
      styles: {
        friendly: { title: 'Friendly School Teacher', desc: 'Warm, positive, using relatable school stories & high encouragement.' },
        stepByStep: { title: 'Step-by-Step Teacher', desc: 'Structured, methodical, patient with deep foundational breakdowns.' },
        practical: { title: 'Practical Demonstrator', desc: 'Experiment-driven, hands-on, focusing on real-world simulations.' },
      },
    },
    subjectSelection: {
      stepBadge: 'Step 4: Choose Subject for {class}',
      title: 'What subject are we learning today?',
      desc: 'Displaying subjects officially designed for your class level ({class}).',
      selectedLabel: 'Selected Subject:',
      proceedMsg: 'Proceed to choose a topic or chapter to begin your AI lesson.',
      standardCurriculum: 'Standard Curriculum',
      continueBtn: 'Continue to Topics',
      backBtn: 'Back',
    },
    topicSelection: {
      stepBadge: 'Step 5: Select Topic in {subject}',
      title: 'Pick a Topic to Start Learning',
      desc: 'Your AI teacher will generate a personalized lesson video, interactive visualizations, and notes.',
      searchPlaceholder: 'Search {subject} chapters or topics...',
      interactiveBadge: 'Interactive Lesson',
      startLearningBtn: 'Start Learning',
      customTopicHeading: 'Have a specific textbook chapter to learn?',
      customTopicPlaceholder: "Type any topic, e.g. 'Photosynthesis' or 'Binary Search'",
      teachTopicBtn: 'Teach This Topic',
      backBtn: 'Back to Subjects',
    },
    lessonPlayer: {
      stepCounter: 'Step {current} of {total}',
      myVoiceActive: 'My Voice Profile Active',
      backToTopics: 'Back to Topics',
      myVoiceStudio: '🎙️ Teacher: Your Personalized Voice',
      myVoiceActiveBadge: 'Active',
      myVoiceActiveDesc: 'All lesson scenes are taught in your calibrated voice profile in {language}.',
      introGreetingBtn: 'Intro Greeting',
      playingIntro: 'Playing...',
      currentFocus: 'Current Focus',
      captionsBtn: 'Captions',
      muteBtn: 'Mute Audio',
      unmuteBtn: 'Unmute Audio',
      stepCompleted: 'Step Completed!',
      nextStepBtn: 'Next Step',
      finishToQuizBtn: 'Finish Lesson & Continue to Quiz',
      previousStepBtn: 'Previous Step',
      replayBtn: 'Replay Current Scene',
      readAloudBtn: 'Read Aloud',
      detailedBreakdown: 'Step-by-Step Lesson Breakdown',
      keySteps: 'Key Explanation Steps',
      coreHighlightFormula: 'Core Highlight & Formula',
      realWorldExample: 'Real-World Example',
      fullNarration: 'Full Teacher Narration',
      modalTitle: 'All Lesson Steps Completed!',
      modalDesc: 'Great job! You have completed all {total} steps of "{title}". You can now proceed to the quiz or practice with teach-back.',
      reviewStepsBtn: 'Review Steps Again',
      continueToQuizModalBtn: '🎯 Continue to Quiz Challenge',
      startTeachBackModalBtn: '🚀 Start Teach-Back Session',
      lockedQuizNotice: 'Watch the complete lesson video to unlock the quiz.',
      audioError: 'Audio playback encountered an issue.',
      retryAudioBtn: 'Retry Audio',
      videoLockedNotice: 'Finish watching the current scene to advance.',
    },
    teachBack: {
      stepBadge: 'Step 7: AI Teach-Back Conversation',
      title: 'Teach Your AI Teacher!',
      desc: 'The best way to master any subject is to teach it to someone else. Explain what you just learned!',
      listening: 'Listening...',
      speakPrompt: 'Click the microphone and speak your explanation...',
      typePrompt: 'Type your explanation here in your own words...',
      submitBtn: 'Submit Explanation',
      evaluating: 'Evaluating your understanding...',
      continueNotesBtn: 'Continue to Notes',
      backToVideoBtn: 'Back to Video',
      scoreLabel: 'Understanding Score',
      strengthsHeading: 'What You Understood Well',
      missingConceptsHeading: 'Concepts to Add or Explore',
      followUpHeading: 'Teacher Follow-Up Question',
      clarifyingTipHeading: 'Clarifying Tip for Mastery',
    },
    notes: {
      stepBadge: 'Step 8: Personalized Revision Notes',
      craftedFor: 'Crafted automatically for {grade} • {subject}',
      backBtn: 'Back',
      copyBtn: 'Copy Notes',
      copiedBtn: 'Copied!',
      printBtn: 'Print Notes',
      playQuizBtn: 'Play Quiz Challenge',
      focusTipHeading: 'Personalized Focus Tip for You',
      definition: 'Simple Definition',
      mainConcepts: 'Main Concepts',
      stepExplanation: 'Step-by-Step Explanation',
      importantTerms: 'Important Terms',
      formulasAndRules: 'Formulas and Rules',
      practicalExamples: 'Practical Everyday Examples',
      revisionPoints: 'Revision Points',
      summary: 'Summary',
      practiceQuestions: 'Practice Questions',
      showAnswer: 'Show Answer',
      hideAnswer: 'Hide Answer',
      hint: 'Hint:',
    },
    quiz: {
      stepBadge: 'Step 9: Interactive Learning Practice',
      challengeTitle: 'Practice Challenge: {topic}',
      instructions: 'Answer questions to test and reinforce what you just learned!',
      questionCounter: 'Question {current} of {total}',
      scoreLabel: 'Score: {score}/{total}',
      mcq: 'Multiple Choice',
      fillBlank: 'Fill in the Blank',
      match: 'Match the Pairs',
      itemsCol: 'Items:',
      descriptionsCol: 'Descriptions:',
      checkAnswerBtn: 'Check Answer',
      nextQuestionBtn: 'Next Question',
      completeQuizBtn: 'Complete Quiz & View Results',
      explanationLabel: 'Explanation:',
      hintLabel: '💡 Hint:',
      backToNotesBtn: 'Back to Notes',
      correctFeedback: 'Correct! Excellent job!',
      incorrectFeedback: 'Not quite. Check the explanation above!',
    },
    completion: {
      title: 'Learning Completed!',
      quizScoreLabel: 'Quiz Score',
      accuracyLabel: 'Accuracy',
      statusLabel: 'Status',
      masteredText: 'Mastered',
      teacherCongrats: "Teacher's Congratulations",
      reviewQuizBtn: 'Review Quiz',
      finishNextTopicBtn: 'Finish & Next Topic',
    },
  },

  Tamil: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'ஏஐ பள்ளி ஆசிரியர்',
      tagline: 'ஒவ்வொரு மாணவருக்குமான தனிப்பயனாக்கப்பட்ட கற்றல் தளம்',
      backBtn: 'பின்செல்',
      logoutBtn: 'வெளியேறு',
      studentPortal: 'மாணவர் தளம்',
      changeTopic: 'தலைப்பை மாற்று',
      steps: {
        login: 'உள்நுழைக',
        student_details: 'வகுப்பு தேர்வு',
        language_selection: 'மொழி தேர்வு',
        teacher_customization: 'ஆசிரியர் தனிப்பயனாக்கம்',
        subject_selection: 'பாடம் தேர்வு',
        topic_selection: 'தலைப்பு தேர்வு',
        lesson_video: 'பாடக் காணொளி',
        teach_back: 'Teach-Back உரையாடல்',
        automatic_notes: 'மீள்பார்வைக் குறிப்புகள்',
        interactive_games: 'பயிற்சி வினாடி-வினா',
        completion: 'நிறைவு!',
      },
    },
    studentDetails: {
      stepBadge: 'படி 1: உங்கள் கல்வி வகுப்பு',
      title: 'நீங்கள் எந்த வகுப்பில் படிக்கிறீர்கள்?',
      desc: 'LearnBuddy உங்கள் வகுப்பு நிலைக்கு ஏற்ப பாடங்கள், சொற்கள் மற்றும் விளையாட்டுகளைத் தனிப்பயனாக்குகிறது.',
      selectedLabel: 'தேர்ந்தெடுக்கப்பட்டது:',
      continueBtn: 'மொழி தேர்வுக்குச் செல்',
      backBtn: 'பின்செல்',
      stages: {
        primary: 'தொடக்கப் பள்ளி',
        middle: 'நடுநிலைப் பள்ளி',
        secondary: 'உயர்நிலைப் பள்ளி',
        higher: 'மேல்நிலைப் பள்ளி',
      },
    },
    languageSelection: {
      stepBadge: 'படி 2: மொழி மற்றும் பேசும் முறை',
      title: 'கற்பித்தல் மொழியைத் தேர்ந்தெடுக்கவும்',
      desc: 'உங்கள் ஏஐ ஆசிரியர் நீங்கள் தேர்ந்தெடுக்கும் மொழியிலேயே உங்களுடன் பேசி, பாடம் கற்பிப்பார்.',
      continueBtn: 'ஆசிரியர் தனிப்பயனாக்கத்திற்குச் செல்',
      backBtn: 'பின்செல்',
      stylesHeading: 'பேசும் நடைகள்:',
    },
    teacherCustomization: {
      stepBadge: 'படி 3: ஆசிரியர் தனிப்பயனாக்கம்',
      title: 'உங்கள் ஆசிரியரைத் தனிப்பயனாக்குங்கள்',
      desc: 'உங்களுக்கு ஏற்ற ஆசிரியர் குரல், பேசும் வேகம் மற்றும் கற்பித்தல் முறையைத் தேர்ந்தெடுக்கவும்.',
      voiceHeading: 'ஆசிரியர் குரல்',
      listenSample: 'குரல் மாதிரியைக் கேள்',
      playingSample: 'ஒலிக்கிறது...',
      useMyVoiceTitle: 'என் சொந்தக் குரலைப் பயன்படுத்து',
      useMyVoiceDesc: 'குறுகிய குரல் மாதிரியைப் பதிவு செய்து, உங்கள் சொந்தக் குரல் அமைப்பில் பாடங்களை உருவாக்கவும்.',
      recordSampleBtn: 'குரல் மாதிரியைப் பதிவு செய்',
      updateVoiceBtn: 'குரல் சுயவிவரத்தைப் புதுப்பி',
      profileActiveBadge: 'செயலில் உள்ளது',
      personalizedStudioBadge: 'தனிப்பயனாக்கப்பட்ட ஸ்டுடியோ',
      speedHeading: 'பேசும் வேகம்',
      slowSpeed: '🐢 மெதுவாக',
      normalSpeed: '🚶 இயல்பாக',
      fastSpeed: '⚡ வேகமாக',
      styleHeading: 'கற்பித்தல் முறை',
      teacherReady: 'ஆசிரியர் தயார்:',
      teachingIn: 'கற்பிக்கும் மொழி:',
      continueBtn: 'பாடம் தேர்வுக்குச் செல்',
      backBtn: 'பின்செல்',
      personas: {
        friendly: { name: 'அனன்யா ஆசிரியர்', persona: 'நட்பான பள்ளி ஆசிரியர்', tone: 'அன்பான, ஊக்கமளிக்கும் ஆதரவு' },
        energetic: { name: 'அரவிந்த் ஆசிரியர்', persona: 'துடிப்பான அறிவியல் வழிகாட்டி', tone: 'சுறுசுறுப்பான, ஆர்வமூட்டும் கற்பித்தல்' },
        analytical: { name: 'ராமன் பேராசிரியர்', persona: 'படிப்படியான STEM வழிகாட்டி', tone: 'ஆழ்ந்த, அமைதியான பகுப்பாய்வு' },
        gentle: { name: 'பிரியா ஆசிரியர்', persona: 'மென்மையான கருத்து வழிகாட்டி', tone: 'தெளிவான, மெதுவான வழிகாட்டல்' },
      },
      styles: {
        friendly: { title: 'நட்பான பள்ளி ஆசிரியர்', desc: 'அன்பான, எளிய உதாரணங்களுடன் கூடிய அதிக ஊக்கமளிக்கும் முறை.' },
        stepByStep: { title: 'படிப்படியான ஆசிரியர்', desc: 'அடிப்படைக் கோட்பாடுகளை ஆழமாக விளக்கும் ஒழுங்கமைக்கப்பட்ட முறை.' },
        practical: { title: 'நேரடி செயல்முறை ஆசிரியர்', desc: 'சோதனைகள் மற்றும் நிஜ வாழ்க்கை பயன்பாடுகளுக்கு முக்கியத்துவம்.' },
      },
    },
    subjectSelection: {
      stepBadge: 'படி 4: {class}-க்கான பாடத்தைத் தேர்ந்தெடுக்கவும்',
      title: 'இன்று நாம் என்ன பாடம் கற்கப் போகிறோம்?',
      desc: 'உங்கள் வகுப்பு நிலைக்குரிய பாடங்கள் கீழே பட்டியலிடப்பட்டுள்ளன ({class}).',
      selectedLabel: 'தேர்ந்தெடுக்கப்பட்ட பாடம்:',
      proceedMsg: 'தலைப்பைத் தேர்ந்தெடுத்து உங்கள் ஏஐ பாடத்தைத் தொடங்கவும்.',
      standardCurriculum: 'பாடத்திட்ட அடிப்படையிலானது',
      continueBtn: 'தலைப்புகள் தேர்வுக்குச் செல்',
      backBtn: 'பின்செல்',
    },
    topicSelection: {
      stepBadge: 'படி 5: {subject}-ல் தலைப்பைத் தேர்ந்தெடுக்கவும்',
      title: 'கற்க வேண்டிய தலைப்பைத் தேர்ந்தெடுக்கவும்',
      desc: 'உங்கள் ஏஐ ஆசிரியர் தனிப்பயனாக்கப்பட்ட பாடக் காணொளி, ஊடாடும் வரைபடங்கள் மற்றும் குறிப்புகளை உருவாக்குவார்.',
      searchPlaceholder: '{subject} அத்தியாயங்கள் அல்லது தலைப்புகளைத் தேடுக...',
      interactiveBadge: 'ஊடாடும் பாடம்',
      startLearningBtn: 'கற்கத் தொடங்கு',
      customTopicHeading: 'பாடப்புத்தகத்திலிருந்து குறிப்பிட்ட தலைப்பைத் தட்டச்சு செய்ய வேண்டுமா?',
      customTopicPlaceholder: "எடுத்துக்காட்டு: 'ஒளிச்சேர்க்கை' அல்லது 'பைனரி தேடல் (Binary Search)'",
      teachTopicBtn: 'இப்பாடத்தைக் கற்பி',
      backBtn: 'பாடங்கள் தேர்வுக்குச் செல்',
    },
    lessonPlayer: {
      stepCounter: 'படி {current} / {total}',
      myVoiceActive: 'சொந்தக் குரல் செயலில் உள்ளது',
      backToTopics: 'தலைப்புகளுக்குத் திரும்பு',
      myVoiceStudio: '🎙️ ஆசிரியர்: உங்கள் சொந்தக் குரல்',
      myVoiceActiveBadge: 'செயலில் உள்ளது',
      myVoiceActiveDesc: 'அனைத்து பாட காட்சிகளும் உங்கள் அளவுத்திருத்தப்பட்ட குரலில் தமிழ் மொழியில் கற்பிக்கப்படுகின்றன.',
      introGreetingBtn: 'அறிமுகக் குரலைக் கேள்',
      playingIntro: 'ஒலிக்கிறது...',
      currentFocus: 'தற்போதைய கவனம்',
      captionsBtn: 'உரை (Captions)',
      muteBtn: 'ஒலியை முடக்கு',
      unmuteBtn: 'ஒலியை இயக்கு',
      stepCompleted: 'படி முடிந்தது!',
      nextStepBtn: 'அடுத்த படிக்குச் செல்',
      finishToQuizBtn: 'பாடம் நிறைவு - வினாடி-வினாவுக்குச் செல்',
      previousStepBtn: 'முந்தைய படி',
      replayBtn: 'மீண்டும் கேள் (Replay)',
      readAloudBtn: '🔊 மீண்டும் வாசி',
      detailedBreakdown: 'படி வாரியான விரிவான விளக்கம்',
      keySteps: 'முக்கிய படிநிலைகள்',
      coreHighlightFormula: 'முக்கிய குறிப்பு & சூத்திரம்',
      realWorldExample: 'நடைமுறை வாழ்க்கை உதாரணம்',
      fullNarration: 'ஆசிரியரின் முழுமையான விளக்கம்',
      modalTitle: 'அனைத்து படிகளையும் கற்றுக்கொண்டீர்கள்!',
      modalDesc: 'வாழ்த்துகள்! "{title}" பாடத்தின் அனைத்து {total} படிகளையும் முழுமையாகப் பார்த்து முடித்துவிட்டீர்கள். இப்போது வினாடி-வினா மூலம் உங்கள் அறிவை சோதிக்கலாம்!',
      reviewStepsBtn: 'படிகளை மறுபரிசீலனை செய்',
      continueToQuizModalBtn: '🎯 வினாடி-வினா சவாலுக்குச் செல்',
      startTeachBackModalBtn: '🚀 Teach-Back உரையாடலைத் தொடங்கு',
      lockedQuizNotice: 'வினாடி-வினாவைத் திறக்க பாடக் காணொளியை முழுமையாகப் பார்க்கவும்.',
      audioError: 'ஒலி பின்னணி ஏற்றுவதில் சிக்கல் ஏற்பட்டது.',
      retryAudioBtn: 'மீண்டும் முயற்சி செய்',
      videoLockedNotice: 'அடுத்த படிக்குச் செல்ல தற்போதைய காட்சியை முழுமையாகப் பார்க்கவும்.',
    },
    teachBack: {
      stepBadge: 'படி 7: ஏஐ ஆசிரியருக்கு கற்பித்தல்',
      title: 'உங்கள் ஏஐ ஆசிரியருக்கு கற்பியுங்கள்!',
      desc: 'ஒரு பாடத்தை முழுமையாகக் கற்றுக்கொள்ள சிறந்த வழி, அதை மற்றவர்களுக்குக் கற்பிப்பதே ஆகும். நீங்கள் புரிந்துகொண்டதை விவரியுங்கள்!',
      listening: 'கேட்கிறது...',
      speakPrompt: 'மைக்ரோஃபோனைச் சொடுக்கி உங்கள் விளக்கத்தைப் பேசுங்கள்...',
      typePrompt: 'உங்கள் சொந்த வார்த்தைகளில் விளக்கத்தை இங்கே தட்டச்சு செய்யவும்...',
      submitBtn: 'விளக்கத்தை சமர்ப்பி',
      evaluating: 'உங்கள் புரிதலை மதிப்பிடுகிறது...',
      continueNotesBtn: 'குறிப்புகளுக்குச் செல்',
      backToVideoBtn: 'காணொளிக்குத் திரும்பு',
      scoreLabel: 'புரிதல் மதிப்பெண்',
      strengthsHeading: 'நீங்கள் சிறப்பாகப் புரிந்துகொண்டவை',
      missingConceptsHeading: 'சேர்க்க வேண்டிய கூடுதல் கருத்துகள்',
      followUpHeading: 'ஆசிரியரின் தொடர் கேள்வி',
      clarifyingTipHeading: 'புரிதலை உறுதிப்படுத்தும் குறிப்பு',
    },
    notes: {
      stepBadge: 'படி 8: தனிப்பயனாக்கப்பட்ட மீள்பார்வைக் குறிப்புகள்',
      craftedFor: '{grade} • {subject}-க்கான பிரத்யேகக் குறிப்புகள்',
      backBtn: 'பின்செல்',
      copyBtn: 'குறிப்புகளை நகலெடு',
      copiedBtn: 'நகலெடுக்கப்பட்டது!',
      printBtn: 'அச்சிடு (Print)',
      playQuizBtn: 'வினாடி-வினா பயிற்சி',
      focusTipHeading: 'உங்களுக்கான தனிப்பயனாக்கப்பட்ட சிறப்புக் குறிப்பு',
      definition: 'எளிய வரையறை',
      mainConcepts: 'முக்கிய கருத்துகள்',
      stepExplanation: 'படி வாரியான விளக்கம்',
      importantTerms: 'முக்கிய கலைச்சொற்கள்',
      formulasAndRules: 'சூத்திரங்கள் மற்றும் விதிகள்',
      practicalExamples: 'நடைமுறை வாழ்க்கை உதாரணங்கள்',
      revisionPoints: 'மீள்பார்வை புள்ளிகள்',
      summary: 'பாடச் சுருக்கம்',
      practiceQuestions: 'பயிற்சி வினாக்கள்',
      showAnswer: 'விடையைக் காட்டு',
      hideAnswer: 'விடையை மறை',
      hint: 'குறிப்பு:',
    },
    quiz: {
      stepBadge: 'படி 9: ஊடாடும் வினாடி-வினா பயிற்சி',
      challengeTitle: 'பயிற்சி சவால்: {topic}',
      instructions: 'உங்கள் புரிதலைச் சோதிக்கவும்! சரியான விடைகளைத் தேர்ந்தெடுத்து அதிக மதிப்பெண் பெறுங்கள்.',
      questionCounter: 'வினா {current} / {total}',
      scoreLabel: 'மதிப்பெண்: {score}/{total}',
      mcq: 'பலவுள் தெரிவு (MCQ)',
      fillBlank: 'கோடிட்ட இடத்தை நிரப்புக',
      match: 'பொருத்துக',
      itemsCol: 'கூறுகள்:',
      descriptionsCol: 'செயல்பாடுகள்:',
      checkAnswerBtn: 'விடையைச் சரிபார்',
      nextQuestionBtn: 'அடுத்த வினா',
      completeQuizBtn: 'வினாடி-வினாவை நிறைவு செய்',
      explanationLabel: 'விளக்கம்:',
      hintLabel: '💡 குறிப்பு:',
      backToNotesBtn: 'குறிப்புகளுக்குத் திரும்பு',
      correctFeedback: 'சரியான விடை! மிக நன்று!',
      incorrectFeedback: 'தவறான விடை. மேலே உள்ள விளக்கத்தைப் பார்க்கவும்!',
    },
    completion: {
      title: 'கற்றல் வெற்றிகரமாக முடிந்தது!',
      quizScoreLabel: 'வினாடி-வினா மதிப்பெண்',
      accuracyLabel: 'துல்லியம்',
      statusLabel: 'நிலை',
      masteredText: 'தேர்ச்சி பெற்றது',
      teacherCongrats: 'ஆசிரியரின் வாழ்த்துகள்',
      reviewQuizBtn: 'வினாடி-வினாவை மீள்பார்வை செய்',
      finishNextTopicBtn: 'நிறைவு செய்து அடுத்த பாடம் செல்',
    },
  },

  Hindi: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'एआई शिक्षक',
      tagline: 'प्रत्येक विद्यार्थी के लिए व्यक्तिगत शिक्षण मंच',
      backBtn: 'पीछे',
      logoutBtn: 'लॉग आउट',
      studentPortal: 'विद्यार्थी पोर्टल',
      changeTopic: 'विषय बदलें',
      steps: {
        login: 'लॉग इन',
        student_details: 'कक्षा चयन',
        language_selection: 'भाषा चयन',
        teacher_customization: 'शिक्षक अनुकूलन',
        subject_selection: 'विषय चयन',
        topic_selection: 'पाठ चयन',
        lesson_video: 'पाठ वीडियो',
        teach_back: 'टीच-बैक सत्र',
        automatic_notes: 'रिवीजन नोट्स',
        interactive_games: 'अभ्यास क्विज़',
        completion: 'पूर्ण!',
      },
    },
    studentDetails: {
      stepBadge: 'चरण 1: आपकी शैक्षणिक कक्षा',
      title: 'आप किस कक्षा में पढ़ते हैं?',
      desc: 'LearnBuddy आपकी कक्षा के स्तर के अनुसार पाठ, शब्दावली और क्विज़ तैयार करता है।',
      selectedLabel: 'चयनित कक्षा:',
      continueBtn: 'भाषा चयन पर जाएं',
      backBtn: 'पीछे',
      stages: {
        primary: 'प्राथमिक विद्यालय',
        middle: 'माध्यमिक विद्यालय',
        secondary: 'उच्च विद्यालय',
        higher: 'उच्चतर माध्यमिक',
      },
    },
    languageSelection: {
      stepBadge: 'चरण 2: भाषा और बोलने की शैली',
      title: 'निर्देश की भाषा चुनें',
      desc: 'आपके एआई शिक्षक आपकी चुनी हुई भाषा में ही आपको पाठ समझाएंगे और संवाद करेंगे।',
      continueBtn: 'शिक्षक अनुकूलन पर जाएं',
      backBtn: 'पीछे',
      stylesHeading: 'बोलने की शैलियाँ:',
    },
    teacherCustomization: {
      stepBadge: 'चरण 3: शिक्षक अनुकूलन',
      title: 'अपने शिक्षक को अनुकूलित करें',
      desc: 'अपनी पसंद की आवाज़, बोलने की गति और शिक्षण शैली चुनें।',
      voiceHeading: 'शिक्षक की आवाज़',
      listenSample: 'आवाज़ का नमूना सुनें',
      playingSample: 'बज रहा है...',
      useMyVoiceTitle: 'मेरी आवाज़ का उपयोग करें',
      useMyVoiceDesc: 'एक छोटा आवाज़ नमूना रिकॉर्ड करके अपनी आवाज़ में पाठ तैयार करें।',
      recordSampleBtn: 'आवाज़ रिकॉर्ड करें',
      updateVoiceBtn: 'आवाज़ प्रोफाइल बदलें',
      profileActiveBadge: 'प्रोफाइल सक्रिय',
      personalizedStudioBadge: 'पर्सनलाइज्ड स्टूडियो',
      speedHeading: 'बोलने की गति',
      slowSpeed: '🐢 धीमी',
      normalSpeed: '🚶 सामान्य',
      fastSpeed: '⚡ तेज',
      styleHeading: 'शिक्षण शैली',
      teacherReady: 'शिक्षक तैयार:',
      teachingIn: 'पढ़ाने की भाषा:',
      continueBtn: 'विषय चयन पर जाएं',
      backBtn: 'पीछे',
      personas: {
        friendly: { name: 'अनन्या मैम', persona: 'मित्रवत शिक्षिका', tone: 'उत्साहवर्धक और सहयोगी' },
        energetic: { name: 'अरविंद सर', persona: 'ऊर्जावान विज्ञान मार्गदर्शक', tone: 'रोचक और सक्रिय' },
        analytical: { name: 'प्रो. रमन', persona: 'क्रमबद्ध STEM विशेषज्ञ', tone: 'शांत और विश्लेषणात्मक' },
        gentle: { name: 'प्रिया मैम', persona: 'सहज अवधारणा मार्गदर्शक', tone: 'स्पष्ट और मधुर' },
      },
      styles: {
        friendly: { title: 'मित्रवत शिक्षिका', desc: 'सकारात्मक, सरल उदाहरणों के साथ प्रोत्साहन भरा शिक्षण।' },
        stepByStep: { title: 'क्रमबद्ध शिक्षक', desc: 'गहन बुनियादी समझ के साथ चरणबद्ध विश्लेषण।' },
        practical: { title: 'व्यावहारिक प्रदर्शक', desc: 'प्रयोगों और वास्तविक जीवन के उदाहरणों पर केंद्रित।' },
      },
    },
    subjectSelection: {
      stepBadge: 'चरण 4: {class} के लिए विषय चुनें',
      title: 'आज हम कौन सा विषय पढ़ेंगे?',
      desc: 'आपकी कक्षा ({class}) के लिए आधिकारिक रूप से निर्धारित विषय नीचे दिए गए हैं।',
      selectedLabel: 'चयनित विषय:',
      proceedMsg: 'पाठ का चयन करके अपना एआई शिक्षण सत्र शुरू करें।',
      standardCurriculum: 'मानक पाठ्यक्रम',
      continueBtn: 'पाठ सूची पर जाएं',
      backBtn: 'पीछे',
    },
    topicSelection: {
      stepBadge: 'चरण 5: {subject} में पाठ चुनें',
      title: 'सीखने के लिए एक पाठ चुनें',
      desc: 'आपके एआई शिक्षक व्यक्तिगत वीडियो, आरेख और नोट्स तैयार करेंगे।',
      searchPlaceholder: '{subject} के अध्याय या पाठ खोजें...',
      interactiveBadge: 'इंटरएक्टिव पाठ',
      startLearningBtn: 'सीखना शुरू करें',
      customTopicHeading: 'क्या आपको पाठ्यपुस्तक का कोई विशेष अध्याय पढ़ना है?',
      customTopicPlaceholder: "उदाहरण: 'प्रकाश संश्लेषण' या 'बाइनरी सर्च'",
      teachTopicBtn: 'यह पाठ पढ़ाएं',
      backBtn: 'विषय सूची पर लौटें',
    },
    lessonPlayer: {
      stepCounter: 'चरण {current} / {total}',
      myVoiceActive: 'मेरी आवाज़ प्रोफाइल सक्रिय',
      backToTopics: 'पाठ सूची पर लौटें',
      myVoiceStudio: '🎙️ शिक्षक: आपकी व्यक्तिगत आवाज़',
      myVoiceActiveBadge: 'सक्रिय',
      myVoiceActiveDesc: 'सभी पाठ दृश्य आपकी कैलिब्रेटेड आवाज़ में हिंदी में पढ़ाए जाएंगे।',
      introGreetingBtn: 'आवाज़ का नमूना सुनें',
      playingIntro: 'बज रहा है...',
      currentFocus: 'वर्तमान बिंदु',
      captionsBtn: 'उपशीर्षक (Captions)',
      muteBtn: 'ध्वनि बंद करें',
      unmuteBtn: 'ध्वनि चालू करें',
      stepCompleted: 'चरण पूरा हुआ!',
      nextStepBtn: 'अगले चरण पर जाएं',
      finishToQuizBtn: 'पाठ पूरा करें - क्विज़ पर जाएं',
      previousStepBtn: 'पिछला चरण',
      replayBtn: 'पुनः सुनें (Replay)',
      readAloudBtn: '🔊 बोलकर पढ़ें',
      detailedBreakdown: 'चरणबद्ध विस्तृत व्याख्या',
      keySteps: 'मुख्य चरण',
      coreHighlightFormula: 'मुख्य नियम और सूत्र',
      realWorldExample: 'दैनिक जीवन का उदाहरण',
      fullNarration: 'शिक्षक की पूरी व्याख्या',
      modalTitle: 'पाठ के सभी चरण पूरे हो गए!',
      modalDesc: 'बधाई हो! आपने "{title}" के सभी {total} चरण पूरे कर लिए हैं। अब आप क्विज़ देकर अपनी समझ परख सकते हैं!',
      reviewStepsBtn: 'चरणों को फिर से देखें',
      continueToQuizModalBtn: '🎯 क्विज़ चुनौती पर जाएं',
      startTeachBackModalBtn: '🚀 टीच-बैक सत्र शुरू करें',
      lockedQuizNotice: 'क्विज़ अनलॉक करने के लिए पूरा वीडियो देखें।',
      audioError: 'ऑडियो चलाने में समस्या आई।',
      retryAudioBtn: 'पुनः प्रयास करें',
      videoLockedNotice: 'आगे बढ़ने से पहले वर्तमान दृश्य पूरा देखें।',
    },
    teachBack: {
      stepBadge: 'चरण 7: एआई शिक्षक को समझाएं',
      title: 'अपने एआई शिक्षक को पढ़ाएं!',
      desc: 'किसी भी विषय को पूरी तरह समझने का सबसे अच्छा तरीका उसे दूसरों को समझाना है। जो सीखा उसे अपने शब्दों में बताएं!',
      listening: 'सुन रहा है...',
      speakPrompt: 'माइक पर क्लिक करें और बोलकर समझाएं...',
      typePrompt: 'अपनी व्याख्या अपने शब्दों में यहाँ टाइप करें...',
      submitBtn: 'व्याख्या जमा करें',
      evaluating: 'आपकी समझ का मूल्यांकन हो रहा है...',
      continueNotesBtn: 'नोट्स पर जाएं',
      backToVideoBtn: 'वीडियो पर लौटें',
      scoreLabel: 'समझ का स्कोर',
      strengthsHeading: 'जो आपने बहुत अच्छे से समझा',
      missingConceptsHeading: 'जो बिंदु और जोड़े जा सकते हैं',
      followUpHeading: 'शिक्षक का अगला प्रश्न',
      clarifyingTipHeading: 'समझ पक्की करने का सुझाव',
    },
    notes: {
      stepBadge: 'चरण 8: व्यक्तिगत रिवीजन नोट्स',
      craftedFor: '{grade} • {subject} के लिए विशेष नोट्स',
      backBtn: 'पीछे',
      copyBtn: 'नोट्स कॉपी करें',
      copiedBtn: 'कॉपी हो गया!',
      printBtn: 'प्रिंट करें',
      playQuizBtn: 'क्विज़ अभ्यास करें',
      focusTipHeading: 'आपके लिए व्यक्तिगत सुझाव',
      definition: 'सरल परिभाषा',
      mainConcepts: 'मुख्य अवधारणाएं',
      stepExplanation: 'चरणबद्ध व्याख्या',
      importantTerms: 'महत्वपूर्ण शब्दावली',
      formulasAndRules: 'सूत्र और नियम',
      practicalExamples: 'दैनिक जीवन के उदाहरण',
      revisionPoints: 'रिवीजन बिंदु',
      summary: 'पाठ सारांश',
      practiceQuestions: 'अभ्यास प्रश्न',
      showAnswer: 'उत्तर देखें',
      hideAnswer: 'उत्तर छुपाएं',
      hint: 'संकेत:',
    },
    quiz: {
      stepBadge: 'चरण 9: इंटरएक्टिव अभ्यास क्विज़',
      challengeTitle: 'अभ्यास चुनौती: {topic}',
      instructions: 'अपनी समझ का परीक्षण करें! सही उत्तर चुनकर उच्च स्कोर बनाएं।',
      questionCounter: 'प्रश्न {current} / {total}',
      scoreLabel: 'स्कोर: {score}/{total}',
      mcq: 'बहुविकल्पीय (MCQ)',
      fillBlank: 'रिक्त स्थान भरें',
      match: 'जोड़ी मिलाएं',
      itemsCol: 'तत्व:',
      descriptionsCol: 'कार्य:',
      checkAnswerBtn: 'उत्तर जांचें',
      nextQuestionBtn: 'अगला प्रश्न',
      completeQuizBtn: 'क्विज़ पूरा करें और परिणाम देखें',
      explanationLabel: 'व्याख्या:',
      hintLabel: '💡 संकेत:',
      backToNotesBtn: 'नोट्स पर लौटें',
      correctFeedback: 'सही उत्तर! बहुत बढ़िया!',
      incorrectFeedback: 'गलत उत्तर। ऊपर दी गई व्याख्या देखें!',
    },
    completion: {
      title: 'कक्षा सफलतापूर्वक पूर्ण!',
      quizScoreLabel: 'क्विज़ स्कोर',
      accuracyLabel: 'सटीकता',
      statusLabel: 'स्थिति',
      masteredText: 'सफलतापूर्वक पूर्ण',
      teacherCongrats: 'शिक्षक की बधाई',
      reviewQuizBtn: 'क्विज़ की समीक्षा करें',
      finishNextTopicBtn: 'समाप्त करें और अगला पाठ चुनें',
    },
  },

  Telugu: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'ఏఐ ఉపాధ్యాయుడు',
      tagline: 'ప్రతి విద్యార్థికి వ్యక్తిగతీకరించిన అభ్యాస వేదిక',
      backBtn: 'వెనుకకు',
      logoutBtn: 'లాగ్ అవుట్',
      studentPortal: 'విద్యార్థి పోర్టల్',
      changeTopic: 'పాఠ్యాంశం మార్చండి',
      steps: {
        login: 'సైన్ ఇన్',
        student_details: 'తరగతి ఎంపిక',
        language_selection: 'భాష ఎంపిక',
        teacher_customization: 'ఉపాధ్యాయుల ఎంపిక',
        subject_selection: 'సబ్జెక్ట్ ఎంపిక',
        topic_selection: 'పాఠం ఎంపిక',
        lesson_video: 'పాఠం వీడియో',
        teach_back: 'టీచ్-బ్యాక్ సెషన్',
        automatic_notes: 'రివిజన్ నోట్స్',
        interactive_games: 'క్విజ్ సాధన',
        completion: 'పూర్తయింది!',
      },
    },
    studentDetails: {
      stepBadge: 'దశ 1: మీ విద్యా తరగతి',
      title: 'మీరు ఏ తరగతి చదువుతున్నారు?',
      desc: 'LearnBuddy మీ తరగతి స్థాయికి తగిన విధంగా పాఠాలు మరియు గేమ్‌లను రూపొందిస్తుంది.',
      selectedLabel: 'ఎంచుకున్నది:',
      continueBtn: 'భాష ఎంపికకు వెళ్లండి',
      backBtn: 'వెనుకకు',
      stages: {
        primary: 'ప్రాథమిక పాఠశాల',
        middle: 'మాధ్యమిక పాఠశాల',
        secondary: 'ఉన్నత పాఠశాల',
        higher: 'హైయర్ సెకండరీ',
      },
    },
    languageSelection: {
      stepBadge: 'దశ 2: భాష మరియు సంభాషణ శైలి',
      title: 'బోధనా భాషను ఎంచుకోండి',
      desc: 'మీ ఏఐ ఉపాధ్యాయుడు మీరు ఎంచుకున్న భాషలోనే మీతో సంభాషిస్తారు.',
      continueBtn: 'ఉపాధ్యాయుల అనుకూలీకరణకు వెళ్లండి',
      backBtn: 'వెనుకకు',
      stylesHeading: 'మాట్లాడే శైలులు:',
    },
    teacherCustomization: {
      stepBadge: 'దశ 3: ఉపాధ్యాయుల అనుకూలీకరణ',
      title: 'మీ ఉపాధ్యాయుడిని ఎంచుకోండి',
      desc: 'మీకు అనువైన వాయిస్, వేగం మరియు బోధనా శైలిని ఎంచుకోండి.',
      voiceHeading: 'ఉపాధ్యాయుడి స్వరం',
      listenSample: 'స్వరాన్ని వినండి',
      playingSample: 'ప్లే అవుతోంది...',
      useMyVoiceTitle: 'నా స్వరాన్ని ఉపయోగించండి',
      useMyVoiceDesc: 'చిన్న వాయిస్ నమూనాను రికార్డ్ చేసి మీ స్వంత స్వరంలో పాఠాలను వినండి.',
      recordSampleBtn: 'వాయిస్ రికార్డ్ చేయండి',
      updateVoiceBtn: 'వాయిస్ అప్‌డేట్ చేయండి',
      profileActiveBadge: 'యాక్టివ్',
      personalizedStudioBadge: 'పర్సనలైజ్డ్ స్టూడియో',
      speedHeading: 'మాట్లాడే వేగం',
      slowSpeed: '🐢 నెమ్మదిగా',
      normalSpeed: '🚶 సాధారణం',
      fastSpeed: '⚡ వేగంగా',
      styleHeading: 'బోధనా శైలి',
      teacherReady: 'టీచర్ సిద్ధం:',
      teachingIn: 'బోధనా భాష:',
      continueBtn: 'సబ్జెక్ట్ ఎంపికకు వెళ్లండి',
      backBtn: 'వెనుకకు',
      personas: {
        friendly: { name: 'అనన్య టీచర్', persona: 'స్నేహపూర్వక ఉపాధ్యాయురాలు', tone: 'సానుకూల మరియు ప్రోత్సాహకరమైన' },
        energetic: { name: 'అరవింద్ సర్', persona: 'ఉత్సాహభరిత సైన్స్ మెంటర్', tone: 'ఆసక్తికరమైన మరియు డైనమిక్' },
        analytical: { name: 'ప్రొ. రామన్', persona: 'స్టెప్-బై-స్టెప్ STEM గైడ్', tone: 'ప్రశాంతమైన మరియు విశ్లేషణాత్మక' },
        gentle: { name: 'ప్రియా టీచర్', persona: 'మృదువైన కాన్సెప్ట్ గైడ్', tone: 'స్పష్టమైన మరియు నెమ్మదిగా' },
      },
      styles: {
        friendly: { title: 'స్నేహపూర్వక టీచర్', desc: 'సానుకూల, సులభమైన ఉదాహరణలతో ప్రోత్సాహకరమైన విధానం.' },
        stepByStep: { title: 'స్టెప్-బై-స్టెప్ టీచర్', desc: 'పునాది భావనలను లోతుగా వివరించే క్రమబద్ధమైన విధానం.' },
        practical: { title: 'ప్రాక్టికల్ ప్రదర్శకుడు', desc: 'ప్రయోగాలు మరియు నిజ జీవిత ఉదాహరణలపై దృష్టి.' },
      },
    },
    subjectSelection: {
      stepBadge: 'దశ 4: {class} కోసం సబ్జెక్ట్ ఎంచుకోండి',
      title: 'ఈ రోజు మనం ఏ సబ్జెక్ట్ నేర్చుకుందాం?',
      desc: 'మీ తరగతి స్థాయికి తగిన సబ్జెక్టులు ఇక్కడ ఉన్నాయి ({class}).',
      selectedLabel: 'ఎంచుకున్న సబ్జెక్ట్:',
      proceedMsg: 'పాఠాన్ని ఎంచుకుని మీ అభ్యాసాన్ని ప్రారంభించండి.',
      standardCurriculum: 'ప్రామాణిక పాఠ్యప్రణాళిక',
      continueBtn: 'పాఠాల జాబితాకు వెళ్లండి',
      backBtn: 'వెనుకకు',
    },
    topicSelection: {
      stepBadge: 'దశ 5: {subject} లో పాఠ్యాంశాన్ని ఎంచుకోండి',
      title: 'నేర్చుకోవడానికి ఒక పాఠాన్ని ఎంచుకోండి',
      desc: 'మీ ఏఐ టీచర్ వీడియో, రేఖాచిత్రాలు మరియు నోట్లను రూపొందిస్తారు.',
      searchPlaceholder: '{subject} పాఠాలను శోధించండి...',
      interactiveBadge: 'ఇంటరాక్టివ్ పాఠం',
      startLearningBtn: 'నేర్చుకోవడం ప్రారంభించండి',
      customTopicHeading: 'మీ పాఠ్యపుస్తకంలోని నిర్దిష్ట పాఠాన్ని నేర్చుకోవాలనుకుంటున్నారా?',
      customTopicPlaceholder: "ఉదాహరణకు: 'Photosynthesis' లేదా 'Binary Search'",
      teachTopicBtn: 'ఈ పాఠాన్ని బోధించండి',
      backBtn: 'సబ్జెక్టులకు వెళ్లండి',
    },
    lessonPlayer: {
      stepCounter: 'దశ {current} / {total}',
      myVoiceActive: 'నా స్వరం యాక్టివ్‌గా ఉంది',
      backToTopics: 'పాఠాలకు వెళ్లండి',
      myVoiceStudio: '🎙️ ఉపాధ్యాయుడు: మీ స్వంత స్వరం',
      myVoiceActiveBadge: 'యాక్టివ్',
      myVoiceActiveDesc: 'అన్ని పాఠ దృశ్యాలు మీ స్వరంలో తెలుగులో బోధించబడతాయి.',
      introGreetingBtn: 'పరిచయ స్వరం వినండి',
      playingIntro: 'ప్లే అవుతోంది...',
      currentFocus: 'ప్రస్తుత అంశం',
      captionsBtn: 'ఉపశీర్షికలు',
      muteBtn: 'ఆడియో మ్యూట్',
      unmuteBtn: 'ఆడియో అన్‌మ్యూట్',
      stepCompleted: 'దశ పూర్తయింది!',
      nextStepBtn: 'తదుపరి దశకు వెళ్లండి',
      finishToQuizBtn: 'పాఠం పూర్తయింది - క్విజ్‌కు వెళ్లండి',
      previousStepBtn: 'మునుపటి దశ',
      replayBtn: 'మళ్లీ వినండి (Replay)',
      readAloudBtn: '🔊 చదివి వినిపించు',
      detailedBreakdown: 'దశలవారీ వివరణ',
      keySteps: 'ముఖ్యమైన దశలు',
      coreHighlightFormula: 'ముఖ్య సూత్రం & వివరణ',
      realWorldExample: 'నిజ జీవిత ఉదాహరణ',
      fullNarration: 'ఉపాధ్యాయుడి పూర్తి వివరణ',
      modalTitle: 'అన్ని దశలు విజయవంతంగా పూర్తయ్యాయి!',
      modalDesc: 'అభినందనలు! మీరు "{title}" పాఠం యొక్క అన్ని {total} దశలను పూర్తి చేశారు. ఇప్పుడు క్విజ్ ద్వారా మీ జ్ఞానాన్ని పరీక్షించుకోవచ్చు!',
      reviewStepsBtn: 'దశలను సమీక్షించండి',
      continueToQuizModalBtn: '🎯 క్విజ్ ఛాలెంజ్‌కు వెళ్లండి',
      startTeachBackModalBtn: '🚀 టీచ్-బ్యాక్ ప్రారంభించండి',
      lockedQuizNotice: 'క్విజ్ తెరవడానికి పూర్తి వీడియోను చూడండి.',
      audioError: 'ఆడియో లోడ్ చేయడంలో సమస్య వచ్చింది.',
      retryAudioBtn: 'మళ్లీ ప్రయత్నించండి',
      videoLockedNotice: 'ముందుకు వెళ్లేందుకు ప్రస్తుత భాగాన్ని పూర్తిగా చూడండి.',
    },
    teachBack: {
      stepBadge: 'దశ 7: ఏఐ టీచర్‌కు వివరించండి',
      title: 'మీ ఏఐ టీచర్‌కు బోధించండి!',
      desc: 'ఏ విషయాన్నైనా బాగా నేర్చుకోవడానికి ఇతరులకు బోధించడమే ఉత్తమ మార్గం. మీరు నేర్చుకున్నదాన్ని వివరించండి!',
      listening: 'వింటోంది...',
      speakPrompt: 'మైక్ క్లిక్ చేసి మాట్లాడండి...',
      typePrompt: 'మీ వివరణను మీ స్వంత మాటల్లో ఇక్కడ టైప్ చేయండి...',
      submitBtn: 'వివరణ సమర్పించండి',
      evaluating: 'మీ అవగాహనను అంచనా వేస్తోంది...',
      continueNotesBtn: 'నోట్స్‌కు వెళ్లండి',
      backToVideoBtn: 'వీడియోకు వెళ్లండి',
      scoreLabel: 'అవగాహన స్కోర్',
      strengthsHeading: 'మీరు బాగా అర్థం చేసుకున్నవి',
      missingConceptsHeading: 'జోడించాల్సిన అంశాలు',
      followUpHeading: 'టీచర్ తదుపరి ప్రశ్న',
      clarifyingTipHeading: 'స్పష్టత కోసం చిట్కా',
    },
    notes: {
      stepBadge: 'దశ 8: రివిజన్ నోట్స్',
      craftedFor: '{grade} • {subject} కోసం రూపొందించబడింది',
      backBtn: 'వెనుకకు',
      copyBtn: 'నోట్స్ కాపీ చేయండి',
      copiedBtn: 'కాపీ చేయబడింది!',
      printBtn: 'ప్రింట్ చేయండి',
      playQuizBtn: 'క్విజ్ ప్రాక్టీస్ చేయండి',
      focusTipHeading: 'మీ కోసం ప్రత్యేక చిట్కా',
      definition: 'సరళమైన నిర్వచనం',
      mainConcepts: 'ప్రధాన భావనలు',
      stepExplanation: 'దశలవారీ వివరణ',
      importantTerms: 'ముఖ్యమైన పదాలు',
      formulasAndRules: 'సూత్రాలు మరియు నియమాలు',
      practicalExamples: 'నిజ జీవిత ఉదాహరణలు',
      revisionPoints: 'రివిజన్ పాయింట్లు',
      summary: 'పాఠం సారాంశం',
      practiceQuestions: 'సాధన ప్రశ్నలు',
      showAnswer: 'సమాధానం చూపించు',
      hideAnswer: 'సమాధానం దాచు',
      hint: 'సూచన:',
    },
    quiz: {
      stepBadge: 'దశ 9: ప్రాక్టీస్ క్విజ్',
      challengeTitle: 'ప్రాక్టీస్ ఛాలెంజ్: {topic}',
      instructions: 'మీ అవగాహనను పరీక్షించుకోండి! సరైన సమాధానాలను ఎంచుకోండి.',
      questionCounter: 'ప్రశ్న {current} / {total}',
      scoreLabel: 'స్కోర్: {score}/{total}',
      mcq: 'బహుళైచ్ఛిక ప్రశ్న (MCQ)',
      fillBlank: 'ఖాళీలను పూరించండి',
      match: 'జతపరచండి',
      itemsCol: 'అంశాలు:',
      descriptionsCol: 'వివరణలు:',
      checkAnswerBtn: 'సమాధానం తనిఖీ చేయండి',
      nextQuestionBtn: 'తదుపరి ప్రశ్న',
      completeQuizBtn: 'క్విజ్ పూర్తి చేసి ఫలితాలు చూడండి',
      explanationLabel: 'వివరణ:',
      hintLabel: '💡 సూచన:',
      backToNotesBtn: 'నోట్స్‌కు వెళ్లండి',
      correctFeedback: 'సరైన సమాధానం! అద్భుతం!',
      incorrectFeedback: 'తప్పు సమాధానం. పై వివరణను చూడండి!',
    },
    completion: {
      title: 'అభ్యాసం విజయవంతంగా పూర్తయింది!',
      quizScoreLabel: 'క్విజ్ స్కోర్',
      accuracyLabel: 'ఖచ్చితత్వం',
      statusLabel: 'స్థితి',
      masteredText: 'పూర్తయింది',
      teacherCongrats: 'టీచర్ అభినందనలు',
      reviewQuizBtn: 'క్విజ్ సమీక్షించండి',
      finishNextTopicBtn: 'ముగించి తదుపరి పాఠానికి వెళ్లండి',
    },
  },

  Malayalam: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'എഐ അധ്യാപകൻ',
      tagline: 'ഓരോ വിദ്യാർത്ഥിക്കും വ്യക്തിഗത പഠന പ്ലാറ്റ്ഫോം',
      backBtn: 'പിന്നോട്ട്',
      logoutBtn: 'ലോഗ് ഔട്ട്',
      studentPortal: 'വിദ്യാർത്ഥി പോർട്ടൽ',
      changeTopic: 'വിഷയം മാറ്റുക',
      steps: {
        login: 'സൈൻ ഇൻ',
        student_details: 'ക്ലാസ് തിരഞ്ഞെടുക്കൽ',
        language_selection: 'ഭാഷ തിരഞ്ഞെടുക്കൽ',
        teacher_customization: 'അധ്യാപക ഇഷ്‌ടാനുസൃതമാക്കൽ',
        subject_selection: 'വിഷയം തിരഞ്ഞെടുക്കൽ',
        topic_selection: 'പാഠം തിരഞ്ഞെടുക്കൽ',
        lesson_video: 'പാഠ വീഡിയോ',
        teach_back: 'ടീച്ച്-ബാക്ക് സെഷൻ',
        automatic_notes: 'റിവിഷൻ കുറിപ്പുകൾ',
        interactive_games: 'ക്വിസ് പരിശീലനം',
        completion: 'പൂർത്തിയായി!',
      },
    },
    studentDetails: {
      stepBadge: 'ഘട്ടം 1: നിങ്ങളുടെ അക്കാദമിക് ക്ലാസ്',
      title: 'ഏത് ക്ലാസിലാണ് പഠിക്കുന്നത്?',
      desc: 'LearnBuddy നിങ്ങളുടെ ക്ലാസ് ലെവലിന് അനുയോജ്യമായ പാഠങ്ങളും ചോദ്യങ്ങളും തയ്യാറാക്കുന്നു.',
      selectedLabel: 'തിരഞ്ഞെടുത്തത്:',
      continueBtn: 'ഭാഷ തിരഞ്ഞെടുപ്പിലേക്ക് പോകുക',
      backBtn: 'പിന്നോട്ട്',
      stages: {
        primary: 'പ്രൈമറി സ്കൂൾ',
        middle: 'മിഡിൽ സ്കൂൾ',
        secondary: 'സെക്കൻഡറി സ്കൂൾ',
        higher: 'ഹയർ സെക്കൻഡറി',
      },
    },
    languageSelection: {
      stepBadge: 'ഘട്ടം 2: ഭാഷയും സംസാര ശൈലിയും',
      title: 'പഠന ഭാഷ തിരഞ്ഞെടുക്കുക',
      desc: 'നിങ്ങൾ തിരഞ്ഞെടുക്കുന്ന ഭാഷയിൽ നിങ്ങളുടെ എഐ അധ്യാപകൻ നിങ്ങളോട് സംസാരിക്കും.',
      continueBtn: 'അധ്യാപക ഇഷ്‌ടാനുസൃതമാക്കലിലേക്ക് പോകുക',
      backBtn: 'പിന്നോട്ട്',
      stylesHeading: 'സംസാര ശൈലികൾ:',
    },
    teacherCustomization: {
      stepBadge: 'ഘട്ടം 3: അധ്യാപക ഇഷ്‌ടാനുസൃതമാക്കൽ',
      title: 'അധ്യാപകനെ തിരഞ്ഞെടുക്കുക',
      desc: 'നിങ്ങൾക്ക് ഏറ്റവും അനുയോജ്യമായ ശബ്ദം, വേഗത, അധ്യാപന ശൈലി എന്നിവ തിരഞ്ഞെടുക്കുക.',
      voiceHeading: 'അധ്യാപക ശബ്ദം',
      listenSample: 'ശബ്ദ സാമ്പിൾ കേൾക്കുക',
      playingSample: 'പ്ലേ ചെയ്യുന്നു...',
      useMyVoiceTitle: 'എന്റെ സ്വന്തം ശബ്ദം ഉപയോഗിക്കുക',
      useMyVoiceDesc: 'ഒരു ചെറിയ സാമ്പിൾ റെക്കോർഡുചെയ്‌ത് നിങ്ങളുടെ ശബ്ദത്തിൽ പാഠങ്ങൾ കേൾക്കുക.',
      recordSampleBtn: 'ശബ്ദം റെക്കോർഡ് ചെയ്യുക',
      updateVoiceBtn: 'ശബ്ദ പ്രൊഫൈൽ മാറ്റുക',
      profileActiveBadge: 'സജീവം',
      personalizedStudioBadge: 'പേഴ്സണലൈസ്ഡ് സ്റ്റുഡിയോ',
      speedHeading: 'സംസാര വേഗത',
      slowSpeed: '🐢 സാവധാനം',
      normalSpeed: '🚶 സാധാരണ',
      fastSpeed: '⚡ വേഗത്തിൽ',
      styleHeading: 'അധ്യാപന ശൈലി',
      teacherReady: 'അധ്യാപകൻ തയ്യാറാണ്:',
      teachingIn: 'പഠന ഭാഷ:',
      continueBtn: 'വിഷയം തിരഞ്ഞെടുപ്പിലേക്ക് പോകുക',
      backBtn: 'പിന്നോട്ട്',
      personas: {
        friendly: { name: 'അനന്യ ടീച്ചർ', persona: 'സൗഹൃദപരമായ അധ്യാപിക', tone: 'പ്രോത്സാഹജനകവും സ്നേഹനിർഭരവും' },
        energetic: { name: 'അരവിന്ദ് സാർ', persona: 'ഊർജ്ജസ്വലനായ സയൻസ് മെന്റർ', tone: 'താൽപ്പര്യജനകവും ചടുലവുമായ' },
        analytical: { name: 'പ്രൊഫ. രാമൻ', persona: 'ഘട്ടം ഘട്ടമായുള്ള STEM ഗൈഡ്', tone: 'ശാന്തവും വിശകലനാത്മകവുമായ' },
        gentle: { name: 'പ്രിയ ടീച്ചർ', persona: 'ശാന്തമായ കൺസെപ്റ്റ് ഗൈഡ്', tone: 'വ്യക്തവും ശാന്തവുമായ' },
      },
      styles: {
        friendly: { title: 'സൗഹൃദപരമായ ടീച്ചർ', desc: 'ലളിതമായ ഉദാഹരണങ്ങളോടെയുള്ള പ്രോത്സാഹന രീതി.' },
        stepByStep: { title: 'ഘട്ടം ഘട്ടമായുള്ള ടീച്ചർ', desc: 'അടിസ്ഥാന ആശയങ്ങൾ ആഴത്തിൽ വിശദീകരിക്കുന്ന രീതി.' },
        practical: { title: 'പ്രാക്ടിക്കൽ ഡെമോൺസ്ട്രേറ്റർ', desc: 'പരീക്ഷണങ്ങൾക്കും യഥാർത്ഥ ജീവിത ഉദാഹരണങ്ങൾക്കും പ്രാധാന്യം.' },
      },
    },
    subjectSelection: {
      stepBadge: 'ഘട്ടം 4: {class}-നായി വിഷയം തിരഞ്ഞെടുക്കുക',
      title: 'ഇന്ന് നമ്മൾ ഏത് വിഷയമാണ് പഠിക്കുന്നത്?',
      desc: 'നിങ്ങളുടെ ക്ലാസിന് അനുയോജ്യമായ വിഷയങ്ങൾ താഴെ കാണാം ({class}).',
      selectedLabel: 'തിരഞ്ഞെടുത്ത വിഷയം:',
      proceedMsg: 'പാഠം തിരഞ്ഞെടുത്ത് പഠനം ആരംഭിക്കുക.',
      standardCurriculum: 'സ്റ്റാൻഡേർഡ് പാഠ്യപദ്ധതി',
      continueBtn: 'പാഠങ്ങളിലേക്ക് പോകുക',
      backBtn: 'പിന്നോട്ട്',
    },
    topicSelection: {
      stepBadge: 'ഘട്ടം 5: {subject}-ൽ പാഠം തിരഞ്ഞെടുക്കുക',
      title: 'പഠിക്കാൻ ഒരു പാഠം തിരഞ്ഞെടുക്കുക',
      desc: 'നിങ്ങളുടെ എഐ അധ്യാപകൻ പാഠ വീഡിയോയും ചിത്രങ്ങളും കുറിപ്പുകളും തയ്യാറാക്കും.',
      searchPlaceholder: '{subject} പാഠങ്ങൾ തിരയുക...',
      interactiveBadge: 'ഇന്ററാക്ടീവ് പാഠം',
      startLearningBtn: 'പഠനം ആരംഭിക്കുക',
      customTopicHeading: 'പാഠപുസ്തകത്തിലെ പ്രത്യേക അധ്യായം പഠിക്കണമെന്നുണ്ടോ?',
      customTopicPlaceholder: "ഉദാഹരണത്തിന്: 'Photosynthesis' അല്ലെങ്കിൽ 'Binary Search'",
      teachTopicBtn: 'ഈ പാഠം പഠിപ്പിക്കുക',
      backBtn: 'വിഷയങ്ങളിലേക്ക് മടങ്ങുക',
    },
    lessonPlayer: {
      stepCounter: 'ഘട്ടം {current} / {total}',
      myVoiceActive: 'എന്റെ സ്വന്തം ശബ്ദം സജീവം',
      backToTopics: 'പാഠങ്ങളിലേക്ക് മടങ്ങുക',
      myVoiceStudio: '🎙️ അധ്യാപകൻ: നിങ്ങളുടെ സ്വന്തം ശബ്ദം',
      myVoiceActiveBadge: 'സജീവം',
      myVoiceActiveDesc: 'എല്ലാ പാഠങ്ങളും നിങ്ങളുടെ കാലിബ്രേറ്റ് ചെയ്ത ശബ്ദത്തിൽ മലയാളത്തിൽ പഠിപ്പിക്കുന്നു.',
      introGreetingBtn: 'ആമുഖ ശബ്ദം കേൾക്കുക',
      playingIntro: 'പ്ലേ ചെയ്യുന്നു...',
      currentFocus: 'നിലവിലെ വിഷയം',
      captionsBtn: 'സബ്‌ടൈറ്റിലുകൾ',
      muteBtn: 'ശബ്ദം ഓഫ് ചെയ്യുക',
      unmuteBtn: 'ശബ്ദം ഓൺ ചെയ്യുക',
      stepCompleted: 'ഘട്ടം പൂർത്തിയായി!',
      nextStepBtn: 'അടുത്ത ഘട്ടത്തിലേക്ക്',
      finishToQuizBtn: 'പാഠം പൂർത്തിയാക്കി ക്വിസിലേക്ക് പോകുക',
      previousStepBtn: 'മുമ്പത്തെ ഘട്ടം',
      replayBtn: 'വീണ്ടും കേൾക്കുക (Replay)',
      readAloudBtn: '🔊 വായിക്കുക',
      detailedBreakdown: 'ഘട്ടം ഘട്ടമായുള്ള വിശദീകരണം',
      keySteps: 'പ്രധാന ഘട്ടങ്ങൾ',
      coreHighlightFormula: 'പ്രധാന സൂത്രവാക്യം',
      realWorldExample: 'യഥാർത്ഥ ജീവിത ഉദാഹരണം',
      fullNarration: 'അധ്യാപകന്റെ പൂർണ്ണ വിവരണം',
      modalTitle: 'എല്ലാ ഘട്ടങ്ങളും പൂർത്തിയായി!',
      modalDesc: 'അഭിനന്ദനങ്ങൾ! "{title}" പാഠത്തിന്റെ എല്ലാ {total} ഘട്ടങ്ങളും വിജയകരമായി പൂർത്തിയാക്കി. ഇനി ക്വിസ് പരിശീലിക്കാം!',
      reviewStepsBtn: 'ഘട്ടങ്ങൾ വീണ്ടും കാണുക',
      continueToQuizModalBtn: '🎯 ക്വിസിലേക്ക് പോകുക',
      startTeachBackModalBtn: '🚀 ടീച്ച്-ബാക്ക് ആരംഭിക്കുക',
      lockedQuizNotice: 'ക്വിസ് അൺലോക്ക് ചെയ്യാൻ വീഡിയോ പൂർണ്ണമായി കാണുക.',
      audioError: 'ഓഡിയോ പ്ലേ ചെയ്യുന്നതിൽ തകരാർ.',
      retryAudioBtn: 'വീണ്ടും ശ്രമിക്കുക',
      videoLockedNotice: 'അടുത്ത ഘട്ടത്തിലേക്ക് പോകുന്നതിന് നിലവിലെ ഭാഗം കാണുക.',
    },
    teachBack: {
      stepBadge: 'ഘട്ടം 7: എഐ അധ്യാപകനെ പഠിപ്പിക്കുക',
      title: 'നിങ്ങളുടെ എഐ അധ്യാപകനെ പഠിപ്പിക്കൂ!',
      desc: 'മറ്റുള്ളവരെ പഠിപ്പിക്കുമ്പോൾ നിങ്ങൾ ആ വിഷയത്തിൽ കൂടുതൽ പ്രാവീണ്യം നേടുന്നു. പഠിച്ച കാര്യങ്ങൾ സ്വന്തം വാക്കുകളിൽ പറയുക!',
      listening: 'കേൾക്കുന്നു...',
      speakPrompt: 'മൈക്കിൽ ക്ലിക്ക് ചെയ്ത് സംസാരിക്കുക...',
      typePrompt: 'നിങ്ങളുടെ വിശദീകരണം സ്വന്തം വാക്കുകളിൽ ഇവിടെ ടൈപ്പ് ചെയ്യുക...',
      submitBtn: 'വിശദീകരണം സമർപ്പിക്കുക',
      evaluating: 'നിങ്ങളുടെ ധാരണ വിലയിരുത്തുന്നു...',
      continueNotesBtn: 'കുറിപ്പുകളിലേക്ക് പോകുക',
      backToVideoBtn: 'വീഡിയോയിലേക്ക് മടങ്ങുക',
      scoreLabel: 'ധാരണ സ്കോർ',
      strengthsHeading: 'നിങ്ങൾ വ്യക്തമായി മനസ്സിലാക്കിയവ',
      missingConceptsHeading: 'കൂടുതൽ ഉൾപ്പെടുത്തേണ്ട ആശയങ്ങൾ',
      followUpHeading: 'അധ്യാപകന്റെ ചോദ്യം',
      clarifyingTipHeading: 'വ്യക്തതയ്ക്കുള്ള നുറുങ്ങ്',
    },
    notes: {
      stepBadge: 'ഘട്ടം 8: റിവിഷൻ കുറിപ്പുകൾ',
      craftedFor: '{grade} • {subject}-നായി തയ്യാറാക്കിയത്',
      backBtn: 'പിന്നോട്ട്',
      copyBtn: 'കുറിപ്പുകൾ പകർപ്പുക',
      copiedBtn: 'പകർത്തി!',
      printBtn: 'പ്രിന്റ് ചെയ്യുക',
      playQuizBtn: 'ക്വിസ് പരിശീലിക്കുക',
      focusTipHeading: 'നിങ്ങൾക്കായുള്ള പ്രത്യേക നുറുങ്ങ്',
      definition: 'ലളിതമായ നിർവ്വചനം',
      mainConcepts: 'പ്രധാന ആശയങ്ങൾ',
      stepExplanation: 'ഘട്ടം ഘട്ടമായുള്ള വിവരണം',
      importantTerms: 'പ്രധാന പദങ്ങൾ',
      formulasAndRules: 'സൂത്രവാക്യങ്ങളും നിയമങ്ങളും',
      practicalExamples: 'യഥാർത്ഥ ജീവിത ഉദാഹരണങ്ങൾ',
      revisionPoints: 'ഓർമ്മിക്കേണ്ട കാര്യങ്ങൾ',
      summary: 'പാഠ സംഗ്രഹം',
      practiceQuestions: 'പരിശീലന ചോദ്യങ്ങൾ',
      showAnswer: 'ഉത്തരം കാണുക',
      hideAnswer: 'ഉത്തരം മറയ്ക്കുക',
      hint: 'സൂചന:',
    },
    quiz: {
      stepBadge: 'ഘട്ടം 9: ക്വിസ് പരിശീലനം',
      challengeTitle: 'പരിശീലന വെല്ലുവിളി: {topic}',
      instructions: 'നിങ്ങളുടെ ധാരണ പരിശോധിക്കൂ! ശരിയായ ഉത്തരങ്ങൾ തിരഞ്ഞെടുക്കുക.',
      questionCounter: 'ചോദ്യം {current} / {total}',
      scoreLabel: 'സ്കോർ: {score}/{total}',
      mcq: 'മൾട്ടിപ്പിൾ ചോയ്സ് (MCQ)',
      fillBlank: 'വിട്ടുപോയ ഭാഗം പൂരിപ്പിക്കുക',
      match: 'ചേരുമ്പടി ചേർക്കുക',
      itemsCol: 'ഘടകങ്ങൾ:',
      descriptionsCol: 'വിശദീകരണങ്ങൾ:',
      checkAnswerBtn: 'ഉത്തരം പരിശോധിക്കുക',
      nextQuestionBtn: 'അടുത്ത ചോദ്യം',
      completeQuizBtn: 'ക്വിസ് പൂർത്തിയാക്കുക',
      explanationLabel: 'വിശദീകരണം:',
      hintLabel: '💡 സൂചന:',
      backToNotesBtn: 'കുറിപ്പുകളിലേക്ക് മടങ്ങുക',
      correctFeedback: 'ശരിയായ ഉത്തരം! മിടുക്കൻ!',
      incorrectFeedback: 'തെറ്റായ ഉത്തരം. മുകളിലെ വിശദീകരണം കാണുക!',
    },
    completion: {
      title: 'പഠനം വിജയകരമായി പൂർത്തിയായി!',
      quizScoreLabel: 'ക്വിസ് സ്കോർ',
      accuracyLabel: 'കൃത്യത',
      statusLabel: 'നില',
      masteredText: 'പൂർത്തിയായി',
      teacherCongrats: 'അധ്യാപകന്റെ അഭിനന്ദനങ്ങൾ',
      reviewQuizBtn: 'ക്വിസ് പരിശോധിക്കുക',
      finishNextTopicBtn: 'അവസാനിപ്പിച്ച് അടുത്ത പാഠത്തിലേക്ക്',
    },
  },

  Kannada: {
    navbar: {
      brandTitle: 'LearnBuddy',
      aiTeacherBadge: 'ಎಐ ಶಿಕ್ಷಕ',
      tagline: 'ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಗೂ ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ವೇದಿಕೆ',
      backBtn: 'ಹಿಂದೆ',
      logoutBtn: 'ಲಾಗ್ ಔಟ್',
      studentPortal: 'ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್',
      changeTopic: 'ವಿಷಯ ಬದಲಾಯಿಸಿ',
      steps: {
        login: 'ಸೈನ್ ಇನ್',
        student_details: 'ತರಗತಿ ಆಯ್ಕೆ',
        language_selection: 'ಭಾಷಾ ಆಯ್ಕೆ',
        teacher_customization: 'ಶಿಕ್ಷಕರ ಆಯ್ಕೆ',
        subject_selection: 'ವಿಷಯ ಆಯ್ಕೆ',
        topic_selection: 'ಪಾಠ ಆಯ್ಕೆ',
        lesson_video: 'ಪಾಠ ವೀಡಿಯೊ',
        teach_back: 'ಟೀಚ್-ಬ್ಯಾಕ್ ಸೆಷನ್',
        automatic_notes: 'ಪುನರಾವರ್ತನೆ ಟಿಪ್ಪಣಿಗಳು',
        interactive_games: 'ರಸಪ್ರಶ್ನೆ ಅಭ್ಯಾಸ',
        completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ!',
      },
    },
    studentDetails: {
      stepBadge: 'ಹಂತ 1: ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ತರಗತಿ',
      title: 'ನೀವು ಯಾವ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿದ್ದೀರಿ?',
      desc: 'LearnBuddy ನಿಮ್ಮ ತರಗತಿಯ ಮಟ್ಟಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಪಾಠಗಳು ಮತ್ತು ಆಟಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.',
      selectedLabel: 'ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ:',
      continueBtn: 'ಭಾಷಾ ಆಯ್ಕೆಗೆ ಮುಂದುವರಿಯಿರಿ',
      backBtn: 'ಹಿಂದೆ',
      stages: {
        primary: 'ಪ್ರಾಥಮಿಕ ಶಾಲೆ',
        middle: 'ಮಾಧ್ಯಮಿಕ ಶಾಲೆ',
        secondary: 'ಪ್ರೌಢಶಾಲೆ',
        higher: 'ಉನ್ನತ ಪ್ರೌಢಶಾಲೆ',
      },
    },
    languageSelection: {
      stepBadge: 'ಹಂತ 2: ಭಾಷೆ ಮತ್ತು ಸಂಭಾಷಣಾ ಶೈಲಿ',
      title: 'ಕಲಿಕಾ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      desc: 'ನಿಮ್ಮ ಎಐ ಶಿಕ್ಷಕರು ನೀವು ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆಯಲ್ಲೇ ನಿಮ್ಮೊಂದಿಗೆ ಸಂಭಾಷಿಸುತ್ತಾರೆ.',
      continueBtn: 'ಶಿಕ್ಷಕರ ಆಯ್ಕೆಗೆ ಮುಂದುವರಿಯಿರಿ',
      backBtn: 'ಹಿಂದೆ',
      stylesHeading: 'ಮಾತನಾಡುವ ಶೈಲಿಗಳು:',
    },
    teacherCustomization: {
      stepBadge: 'ಹಂತ 3: ಶಿಕ್ಷಕರ ಗ್ರಾಹಕೀಕರಣ',
      title: 'ನಿಮ್ಮ ಶಿಕ್ಷಕರನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ',
      desc: 'ನಿಮಗೆ ಸೂಕ್ತವಾದ ಧ್ವನಿ, ವೇಗ ಮತ್ತು ಬೋಧನಾ ಶೈಲಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      voiceHeading: 'ಶಿಕ್ಷಕರ ಧ್ವನಿ',
      listenSample: 'ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಕೇಳಿ',
      playingSample: 'ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
      useMyVoiceTitle: 'ನನ್ನ ಸ್ವಂತ ಧ್ವನಿಯನ್ನು ಬಳಸಿ',
      useMyVoiceDesc: 'ಸಣ್ಣ ಧ್ವನಿ ಮಾದರಿಯನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ ನಿಮ್ಮ ಧ್ವನಿಯಲ್ಲೇ ಪಾಠಗಳನ್ನು ಕೇಳಿ.',
      recordSampleBtn: 'ಧ್ವನಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
      updateVoiceBtn: 'ಧ್ವನಿ ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ',
      profileActiveBadge: 'ಸಕ್ರಿಯ',
      personalizedStudioBadge: 'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಸ್ಟುಡಿಯೋ',
      speedHeading: 'ಮಾತನಾಡುವ ವೇಗ',
      slowSpeed: '🐢 ನಿಧಾನ',
      normalSpeed: '🚶 ಸಾಮಾನ್ಯ',
      fastSpeed: '⚡ ವೇಗ',
      styleHeading: 'ಬೋಧನಾ ಶೈಲಿ',
      teacherReady: 'ಶಿಕ್ಷಕರು ಸಿದ್ಧರಾಗಿದ್ದಾರೆ:',
      teachingIn: 'ಕಲಿಕಾ ಭಾಷೆ:',
      continueBtn: 'ವಿಷಯ ಆಯ್ಕೆಗೆ ಮುಂದುವರಿಯಿರಿ',
      backBtn: 'ಹಿಂದೆ',
      personas: {
        friendly: { name: 'ಅನನ್ಯ ಟೀಚರ್', persona: 'ಸ್ನೇಹಪರ ಶಿಕ್ಷಕಿ', tone: 'ಪ್ರೋತ್ಸಾಹದಾಯಕ ಮತ್ತು ಬೆಂಬಲ' },
        energetic: { name: 'ಅರವಿಂದ್ ಸರ್', persona: 'ಉತ್ಸಾಹಿ ಸೈನ್ಸ್ ಮಾರ್ಗದರ್ಶಕ', tone: 'ಕುತೂಹಲಕಾರಿ ಮತ್ತು ಕ್ರಿಯಾತ್ಮಕ' },
        analytical: { name: 'ಪ್ರೊ. ರಾಮನ್', persona: 'ಹಂತ-ಹಂತದ STEM ಮಾರ್ಗದರ್ಶಿ', tone: 'ಶಾಂತ ಮತ್ತು ವಿಶ್ಲೇಷಣಾತ್ಮಕ' },
        gentle: { name: 'ಪ್ರಿಯಾ ಟೀಚರ್', persona: 'ಸೌಮ್ಯ ಪರಿಕಲ್ಪನಾ ಮಾರ್ಗದರ್ಶಿ', tone: 'ಸ್ಪಷ್ಟ ಮತ್ತು ಮೃದು' },
      },
      styles: {
        friendly: { title: 'ಸ್ನೇಹಪರ ಶಿಕ್ಷಕಿ', desc: 'ಸಕಾರಾತ್ಮಕ, ಸುಲಭ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಪ್ರೋತ್ಸಾಹಿಸುವ ವಿಧಾನ.' },
        stepByStep: { title: 'ಹಂತ ಹಂತದ ಶಿಕ್ಷಕರು', desc: 'ಮೂಲ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಆಳವಾಗಿ ವಿವರಿಸುವ ವ್ಯವಸ್ಥಿತ ವಿಧಾನ.' },
        practical: { title: 'ಪ್ರಾಯೋಗಿಕ ಪ್ರದರ್ಶಕರು', desc: 'ಪ್ರಯೋಗಗಳು ಮತ್ತು ನೈಜ ಜೀವನದ ಉದಾಹರಣೆಗಳಿಗೆ ಒತ್ತು.' },
      },
    },
    subjectSelection: {
      stepBadge: 'ಹಂತ 4: {class} ಗಾಗಿ ವಿಷಯವನ್ನು ಆರಿಸಿ',
      title: 'ಇಂದು ನಾವು ಯಾವ ವಿಷಯವನ್ನು ಕಲಿಯೋಣ?',
      desc: 'ನಿಮ್ಮ ತರಗತಿಗೆ ನಿಗದಿಪಡಿಸಲಾದ ವಿಷಯಗಳು ಇಲ್ಲಿವೆ ({class}).',
      selectedLabel: 'ಆಯ್ಕೆಮಾಡಿದ ವಿಷಯ:',
      proceedMsg: 'ಪಾಠವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ.',
      standardCurriculum: 'ಪ್ರಮಾಣಿತ ಪಠ್ಯಕ್ರಮ',
      continueBtn: 'ಪಾಠಗಳ ಪಟ್ಟಿಗೆ ಮುಂದುವರಿಯಿರಿ',
      backBtn: 'ಹಿಂದೆ',
    },
    topicSelection: {
      stepBadge: 'ಹಂತ 5: {subject} ನಲ್ಲಿ ಪಾಠವನ್ನು ಆರಿಸಿ',
      title: 'ಕಲಿಯಲು ಒಂದು ಪಾಠವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      desc: 'ನಿಮ್ಮ ಎಐ ಶಿಕ್ಷಕರು ವೀಡಿಯೊ, ಚಿತ್ರಗಳು ಮತ್ತು ಟಿಪ್ಪಣಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.',
      searchPlaceholder: '{subject} ಪಾಠಗಳನ್ನು ಹುಡುಕಿ...',
      interactiveBadge: 'ಸಂವಾದಾತ್ಮಕ ಪಾಠ',
      startLearningBtn: 'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ',
      customTopicHeading: 'ಪಠ್ಯಪುಸ್ತಕದ ನಿರ್ದಿಷ್ಟ ಪಾಠವನ್ನು ಕಲಿಯಬೇಕೆ?',
      customTopicPlaceholder: "ಉದಾಹರಣೆಗೆ: 'Photosynthesis' ಅಥವಾ 'Binary Search'",
      teachTopicBtn: 'ಈ ಪಾಠವನ್ನು ಬೋಧಿಸಿ',
      backBtn: 'ವಿಷಯಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
    },
    lessonPlayer: {
      stepCounter: 'ಹಂತ {current} / {total}',
      myVoiceActive: 'ನನ್ನ ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ',
      backToTopics: 'ಪಾಠಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
      myVoiceStudio: '🎙️ ಶಿಕ್ಷಕರು: ನಿಮ್ಮ ಸ್ವಂತ ಧ್ವನಿ',
      myVoiceActiveBadge: 'ಸಕ್ರಿಯ',
      myVoiceActiveDesc: 'ಎಲ್ಲಾ ಪಾಠದ ದೃಶ್ಯಗಳನ್ನು ನಿಮ್ಮ ಕ್ಯಾಲಿಬ್ರೇಟ್ ಮಾಡಿದ ಧ್ವನಿಯಲ್ಲಿ ಕನ್ನಡದಲ್ಲಿ ಬೋಧಿಸಲಾಗುತ್ತದೆ.',
      introGreetingBtn: 'ಪರಿಚಯ ಧ್ವನಿ ಕೇಳಿ',
      playingIntro: 'ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
      currentFocus: 'ಪ್ರಸ್ತುತ ಗಮನ',
      captionsBtn: 'ಉಪಶೀರ್ಷಿಕೆಗಳು',
      muteBtn: 'ಧ್ವನಿ ಮ್ಯೂಟ್ ಮಾಡಿ',
      unmuteBtn: 'ಧ್ವನಿ ಆನ್ ಮಾಡಿ',
      stepCompleted: 'ಹಂತ ಪೂರ್ಣಗೊಂಡಿದೆ!',
      nextStepBtn: 'ಮುಂದಿನ ಹಂತಕ್ಕೆ',
      finishToQuizBtn: 'ಪಾಠ ಪೂರ್ಣಗೊಳಿಸಿ ರಸಪ್ರಶ್ನೆಗೆ ಮುಂದುವರಿಯಿರಿ',
      previousStepBtn: 'ಹಿಂದಿನ ಹಂತ',
      replayBtn: 'ಮತ್ತೆ ಕೇಳಿ (Replay)',
      readAloudBtn: '🔊 ಓದಿ',
      detailedBreakdown: 'ಹಂತ ಹಂತದ ವಿವರಣೆ',
      keySteps: 'ಪ್ರಮುಖ ಹಂತಗಳು',
      coreHighlightFormula: 'ಪ್ರಮುಖ ಸೂತ್ರ ಮತ್ತು ಮುಖ್ಯಾಂಶ',
      realWorldExample: 'ನೈಜ ಜೀವನದ ಉದಾಹರಣೆ',
      fullNarration: 'ಶಿಕ್ಷಕರ ಸಂಪೂರ್ಣ ವಿವರಣೆ',
      modalTitle: 'ಎಲ್ಲಾ ಹಂತಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ!',
      modalDesc: 'ಅಭಿನಂದನೆಗಳು! ನೀವು "{title}" ನ ಎಲ್ಲಾ {total} ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ಈಗ ನೀವು ರಸಪ್ರಶ್ನೆ ಮೂಲಕ ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಬಹುದು!',
      reviewStepsBtn: 'ಹಂತಗಳನ್ನು ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ',
      continueToQuizModalBtn: '🎯 ರಸಪ್ರಶ್ನೆ ಸವಾಲಿಗೆ ಮುಂದುವರಿಯಿರಿ',
      startTeachBackModalBtn: '🚀 ಟೀಚ್-ಬ್ಯಾಕ್ ಪ್ರಾರಂಭಿಸಿ',
      lockedQuizNotice: 'ರಸಪ್ರಶ್ನೆ ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಸಂಪೂರ್ಣ ವೀಡಿಯೊ ನೋಡಿ.',
      audioError: 'ಆಡಿಯೋ ಪ್ಲೇ ಮಾಡುವಲ್ಲಿ ಸಮಸ್ಯೆ ಉಂಟಾಗಿದೆ.',
      retryAudioBtn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      videoLockedNotice: 'ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗಲು ಪ್ರಸ್ತುತ ದೃಶ್ಯವನ್ನು ಪೂರ್ಣವಾಗಿ ನೋಡಿ.',
    },
    teachBack: {
      stepBadge: 'ಹಂತ 7: ಎಐ ಶಿಕ್ಷಕರಿಗೆ ವಿವರಿಸಿ',
      title: 'ನಿಮ್ಮ ಎಐ ಶಿಕ್ಷಕರಿಗೆ ಬೋಧಿಸಿ!',
      desc: 'ಯಾವುದೇ ವಿಷಯವನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳಲು ಉತ್ತಮ ಮಾರ್ಗವೆಂದರೆ ಅದನ್ನು ಇತರರಿಗೆ ಕಲಿಸುವುದು. ನೀವು ಕಲಿತದ್ದನ್ನು ವಿವರಿಸಿ!',
      listening: 'ಆಲಿಸುತ್ತಿದೆ...',
      speakPrompt: 'ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮಾತನಾಡಿ...',
      typePrompt: 'ನಿಮ್ಮ ವಿವರಣೆಯನ್ನು ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
      submitBtn: 'ವಿವರಣೆಯನ್ನು ಸಲ್ಲಿಸಿ',
      evaluating: 'ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      continueNotesBtn: 'ಟಿಪ್ಪಣಿಗಳಿಗೆ ಮುಂದುವರಿಯಿರಿ',
      backToVideoBtn: 'ವೀಡಿಯೊಗೆ ಹಿಂತಿರುಗಿ',
      scoreLabel: 'ತಿಳುವಳಿಕೆ ಸ್ಕೋರ್',
      strengthsHeading: 'ನೀವು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡ ವಿಷಯಗಳು',
      missingConceptsHeading: 'ಸೇರಿಸಬೇಕಾದ ಅಂಶಗಳು',
      followUpHeading: 'ಶಿಕ್ಷಕರ ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      clarifyingTipHeading: 'ಸ್ಪಷ್ಟತೆಗಾಗಿ ಸಲಹೆ',
    },
    notes: {
      stepBadge: 'ಹಂತ 8: ಪುನರಾವರ್ತನೆ ಟಿಪ್ಪಣಿಗಳು',
      craftedFor: '{grade} • {subject} ಗಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ',
      backBtn: 'ಹಿಂದೆ',
      copyBtn: 'ಟಿಪ್ಪಣಿಗಳನ್ನು ನಕಲಿಸಿ',
      copiedBtn: 'ನಕಲಿಸಲಾಗಿದೆ!',
      printBtn: 'ಮುದ್ರಿಸಿ (Print)',
      playQuizBtn: 'ರಸಪ್ರಶ್ನೆ ಅಭ್ಯಾಸ ಮಾಡಿ',
      focusTipHeading: 'ನಿಮಗಾಗಿ ವೈಯಕ್ತಿಕ ಸಲಹೆ',
      definition: 'ಸರಳ ವ್ಯಾಖ್ಯಾನ',
      mainConcepts: 'ಮುಖ್ಯ ಪರಿಕಲ್ಪನೆಗಳು',
      stepExplanation: 'ಹಂತ ಹಂತದ ವಿವರಣೆ',
      importantTerms: 'ಪ್ರಮುಖ ಪದಗಳು',
      formulasAndRules: 'ಸೂತ್ರಗಳು ಮತ್ತು ನಿಯಮಗಳು',
      practicalExamples: 'ನೈಜ ಜೀವನದ ಉದಾಹರಣೆಗಳು',
      revisionPoints: 'ಪುನರಾವರ್ತನೆ ಅಂಶಗಳು',
      summary: 'ಪಾಠದ ಸಾರಾಂಶ',
      practiceQuestions: 'ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು',
      showAnswer: 'ಉತ್ತರ ತೋರಿಸಿ',
      hideAnswer: 'ಉತ್ತರ ಮರೆಮಾಡಿ',
      hint: 'ಸುಳಿವು:',
    },
    quiz: {
      stepBadge: 'ಹಂತ 9: ಸಂವಾದಾತ್ಮಕ ರಸಪ್ರಶ್ನೆ',
      challengeTitle: 'ಅಭ್ಯಾಸ ಸವಾಲು: {topic}',
      instructions: 'ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ! ಸರಿಯಾದ ಉತ್ತರಗಳನ್ನು ಆರಿಸಿ.',
      questionCounter: 'ಪ್ರಶ್ನೆ {current} / {total}',
      scoreLabel: 'ಸ್ಕೋರ್: {score}/{total}',
      mcq: 'ಬಹು ಆಯ್ಕೆ ಪ್ರಶ್ನೆ (MCQ)',
      fillBlank: 'ಖಾಲಿ ಜಾಗ ತುಂಬಿರಿ',
      match: 'ಹೊಂದಿಸಿ ಬರೆಯಿರಿ',
      itemsCol: 'ಅಂಶಗಳು:',
      descriptionsCol: 'ವಿವರಣೆಗಳು:',
      checkAnswerBtn: 'ಉತ್ತರ ಪರಿಶೀಲಿಸಿ',
      nextQuestionBtn: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      completeQuizBtn: 'ರಸಪ್ರಶ್ನೆ ಪೂರ್ಣಗೊಳಿಸಿ',
      explanationLabel: 'ವಿವರಣೆ:',
      hintLabel: '💡 ಸುಳಿವು:',
      backToNotesBtn: 'ಟಿಪ್ಪಣಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
      correctFeedback: 'ಸರಿಯಾದ ಉತ್ತರ! ಅದ್ಭುತ!',
      incorrectFeedback: 'ತಪ್ಪು ಉತ್ತರ. ಮೇಲಿನ ವಿವರಣೆಯನ್ನು ನೋಡಿ!',
    },
    completion: {
      title: 'ಕಲಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ!',
      quizScoreLabel: 'ರಸಪ್ರಶ್ನೆ ಸ್ಕೋರ್',
      accuracyLabel: 'ನಿಖರತೆ',
      statusLabel: 'ಸ್ಥಿತಿ',
      masteredText: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      teacherCongrats: 'ಶಿಕ್ಷಕರ ಅಭಿನಂದನೆಗಳು',
      reviewQuizBtn: 'ರಸಪ್ರಶ್ನೆ ಪರಿಶೀಲಿಸಿ',
      finishNextTopicBtn: 'ಮುಗಿಸಿ ಮುಂದಿನ ಪಾಠಕ್ಕೆ ಹೋಗಿ',
    },
  },
};

export function getTranslations(language: string): TranslationDictionary {
  const langKey = (language || 'English').trim();
  const normalizedKey = Object.keys(translations).find(
    (k) => k.toLowerCase() === langKey.toLowerCase()
  ) as SupportedLanguage | undefined;

  return translations[normalizedKey || 'English'] || translations.English;
}

export function formatString(template: string, params: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}
