import React, { useState, useEffect } from 'react'
import logo from '../assets/logo2.png'

import { initializeApp,  } from "firebase/app";
import { getDatabase, ref, set, push, child, update } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDxBd7x8q6K6oBLJ-WDb2joXU4xFJhy6qA",

  authDomain: "kebab-27b3b.firebaseapp.com",

  databaseURL: "https://kebab-27b3b-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "kebab-27b3b",

  storageBucket: "kebab-27b3b.appspot.com",

  messagingSenderId: "559672620036",

  appId: "1:559672620036:web:04a511a8b1b3b8cc203151"


};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function setData(user, answers, time, feedback) {
  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  const postData = {
    user: user,
    answers: answers,
    time: time,
    feedback: feedback,
  };

  const updates = {

  };
  updates['/plays/' + newPostKey] = postData;

  update(ref(db), updates).then(() => {
    console.log('Data set.');
  }
  ).catch((error) => {
    console.log(error);
  });
}

export default function Game() {


  const [user, setUser] = useState({
    name: '',
    email: '',
    relatinship: '',
    programming_experience: 'None',
    programming_language: 'None',
    case: 'None',
  })

  const [emailFlag, setEmailFlag] = useState(false)
  const [showPossibleAnswers, setShowPossibleAnswers] = useState(false)
  const [clickedAnswer, setClickedAnswer] = useState([
    false,
    false,
    false,
    false,
  ])

  function ifUserNotComplete() {
    if (user.name === '' || user.email === '' || user.relatinship === '') {
      return true
    } else {
      return false
    }
  }

  function startTimer() {
    const d = new Date();
    var t = d.getTime();
    return t;
  }

  function endTimer(start) {
    const d = new Date();
    var t = d.getTime();
    return (t - start);
  }

  const questions = [
    // Phrases with 2 words
    {
      case: 'camelcase',
      numberOfWords: 2,
      correctAnswer: 'ringAllBehavior',
      question: 'ring all behavior',
      answer1: 'ringAllBehavior',
      answer2: 'ringAtTheBell',
      answer3: 'ringAnyBarrier',
      answer4: 'ringAnyBeach',
    },
    {
      case: 'camelcase',
      numberOfWords: 2,
      correctAnswer: 'qualityTime',
      question: 'quality time',
      answer1: 'qualityTake',
      answer2: 'qualityTime',
      answer3: 'qualifyToss',
      answer4: 'quantifyTime',
    },
    {
      case: 'kebabcase',
      numberOfWords: 2,
      correctAnswer: 'top-drawer',
      question: 'top drawer',
      answer1: 'top-depart',
      answer2: 'tap-delete',
      answer3: 'top-drawer',
      answer4: 'trop-driver',
    },
    {
      case: 'kebabcase',
      numberOfWords: 2,
      correctAnswer: 'flea-market',
      question: 'flea market',
      answer1: 'flea-market',
      answer2: 'flee-merit',
      answer3: 'flea-marked',
      answer4: 'flew-market',
    },
    // Phrases with 3 words
    {
      case: 'kebabcase',
      numberOfWords: 3,
      correctAnswer: 'hole-cut-bellow',
      question: 'hole cut bellow',
      answer1: 'hole-cat-bellow',
      answer2: 'hole-cut-below',
      answer3: 'hole-cut-bellow',
      answer4: 'hall-cut-bellow',
    },
    {
      case: 'kebabcase',
      numberOfWords: 3,
      correctAnswer: 'on-cloud-nine',
      question: 'on cloud nine',
      answer1: 'on-claud-nine',
      answer2: 'on-cloud-nine',
      answer3: 'om-cloud-nine',
      answer4: 'on-clawed-nine',
    },
    {
      case: 'camelcase',
      numberOfWords: 3,
      correctAnswer: 'tugOfWar',
      question: 'tug of war',
      answer1: 'tugOffWar',
      answer2: 'tegOfWar',
      answer3: 'tugOfWor',
      answer4: 'tugOfWar',
    },
    {
      case: 'camelcase',
      numberOfWords: 3,
      correctAnswer: 'ringAnyBells',
      question: 'ring any bells',
      answer1: 'ringAndBells',
      answer2: 'ringAnyBells',
      answer3: 'rightAnyBelts',
      answer4: 'ringAnnyBells',
    },
    // Phrases with 4 words
    {
      case: 'kebabcase',
      numberOfWords: 4,
      correctAnswer: 'back-to-square-one',
      question: 'back to square one',
      answer1: 'beck-to-square-one',
      answer2: 'back-to-squire-one',
      answer3: 'back-to-square-on',
      answer4: 'back-to-square-one',
    },
    {
      case: 'kebabcase',
      numberOfWords: 4,
      correctAnswer: 'my-cup-of-tea',
      question: 'my cup of tea',
      answer1: 'my-cup-of-tea',
      answer2: 'mi-cup-of-tea',
      answer3: 'my-cup-of-tee',
      answer4: 'my-cvp-of-tea',
    },
    {
      case: 'camelcase',
      numberOfWords: 4,
      correctAnswer: 'shotInTheDark',
      question: 'shot in the dark',
      answer1: 'schotInTheDark',
      answer2: 'shotInhTheDark',
      answer3: 'ShoeInTheBark',
      answer4: 'shotInTheDark',
    },
    {
      case: 'camelcase',
      numberOfWords: 4,
      correctAnswer: 'closeButNoCigar',
      question: 'close but no cigar',
      answer1: 'closeBytNoCigar',
      answer2: 'closeButNoCigar',
      answer3: 'closeBulNoCigar',
      answer4: 'clsoseButNoCigar',
    },
    // Phrases with 5 words
    {
      case: 'kebabcase',
      numberOfWords: 5,
      correctAnswer: 'short-end-of-the-stick',
      question: 'short end of the stick',
      answer1: 'short-end-of-the-stick',
      answer2: 'shored-end-of-the-stick',
      answer3: 'short-end-of-the-steck',
      answer4: 'short-end-off-the-stick',
    },
    {
      case: 'kebabcase',
      numberOfWords: 5,
      correctAnswer: 'two-down-one-to-go',
      question: 'two down one to go',
      answer1: 'two-doxn-one-to-go',
      answer2: 'too-down-one-to-go',
      answer3: 'two-down-one-to-ho',
      answer4: 'two-down-one-to-go',
    },
    {
      case: 'camelcase',
      numberOfWords: 5,
      correctAnswer: 'swingingForTheFences',
      question: 'swinging for the fences',
      answer1: 'swingingForTheFences',
      answer2: 'swingeingForTheFences',
      answer3: 'swingingForTheFancies',
      answer4: 'swillingForTheFences',
    },
    {
      case: 'camelcase',
      numberOfWords: 5,
      correctAnswer: 'backToTheDrawingBoard',
      question: 'back to the drawing board',
      answer1: 'backToTheDrywingBoard',
      answer2: 'backToTheDrawingBoard',
      answer3: 'backToTheDrawingBored',
      answer4: 'backToTheDrawingBord',
    },


  ]

  function isRightAnswer(question_number, answer_index) {

    if (questions[question_number].correctAnswer === questions[question_number][`answer${answer_index}`]) {
      return true
    } else {
      return false
    }
  }




  const [answer, setAnswer] = useState({
    "answer1": [],
    "answer2": [],
    "answer3": [],
    "answer4": [],
    "answer5": [],
    "answer6": [],
    "answer7": [],
    "answer8": [],
    "answer9": [],
    "answer10": [],
    "answer11": [],
    "answer12": [],
    "answer13": [],
    "answer14": [],
    "answer15": [],
    "answer16": [],
  })

  const [time, setTime] = useState({
    "time1": [],
    "time2": [],
    "time3": [],
    "time4": [],
    "time5": [],
    "time6": [],
    "time7": [],
    "time8": [],
    "time9": [],
    "time10": [],
    "time11": [],
    "time12": [],
    "time13": [],
    "time14": [],
    "time15": [],
    "time16": [],
  })

  const [feedback, setFeedback] = useState("")

  const [startTime, setStartTime] = useState(0);
  const [page, setPage] = useState(-1)
  return (
    <div className='w-full h-screen pt-10'>
      <img src={logo} alt='logo' className='mx-auto  h-20' />
      {page === -1 &&
        <div className='flex flex-col items-center xl:w-1/3 lg:w-1/2 md:w-1/2 mx-auto px-10'>
          <h1 className='text-2xl font-bold mt-16'>Welcome to our case survey!</h1>
          <p className='text-xl mt-5'>This survey will take about 6 minutes.</p>
          <p className='text-lg font-bold mt-20'>How it works?</p>
          <div>
          <p className='text-lg mt-5'>1. You will be asked to remember a presented sentance.</p>
          <p className='text-lg mt-5'>2. Once you memorized it, click "ready?".</p>
          <p className='text-lg mt-5'>3. You will be presented with 4 options, one of them is the correct answer you memorized previously.</p>
          <p className='text-lg mt-5'>4. Select the correct answer and you will be directed to the next question.</p>
          <p className='text-lg mt-5'>5. Once you finish the survey, you will be able to leave feedback.</p>
          </div>
          <p className='text-lg font-bold mt-20'>Ready to start?</p>
          <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-10 w-full' onClick={() => setPage(0)}>Start</button>
        </div>

      }

      {
        // User information page
        page === 0 &&
        <div className='flex flex-col items-center xl:w-1/3 lg:w-1/3 md:w-1/2 mx-auto px-10'>
          <h1 className='text-2xl font-bold mt-16'>Let's get to know you!</h1>
          <p className='text-sm mt-5'>Please fill out the form below to start the game.</p>
          <div className='flex flex-col mt-10 w-full'>
            <label className='text-sm'>Name</label>
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <label className='text-sm mt-4'>Email address</label>
            {emailFlag && <p className='text-red-500 text-xs'>Please enter a valid email address</p>}
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.email} onChange={
              (e) => {
                if (e.target.value.includes('@')) {
                  setEmailFlag(false)
                  setUser({ ...user, email: e.target.value })
                } else {
                  setEmailFlag(true)
                  setUser({ ...user, email: e.target.value })
                }
              }} />
            <label className='text-sm mt-4'>What is your occupation?</label>
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.relatinship} onChange={(e) => setUser({ ...user, relatinship: e.target.value })} />
            <label className='text-sm mt-4'>Programming experience?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.programming_experience} onChange={(e) => setUser({ ...user, programming_experience: e.target.value })}>
              <option value='None'>Never coded</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </select>
            <label className='text-sm mt-4'>What case you prefer?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.case} onChange={(e) => setUser({ ...user, case: e.target.value })}>
              <option value='None'>Does not apply to me</option>
              <option value='camelcase'>camelCase</option>
              <option value='snakecase'>snake_case</option>
              <option value='kebabcase'>kebab-case</option>
              <option value='pascalcase'>PascalCase</option>
              <option value='dotcase'>dot.case</option>
              <option value='pathcase'>path/case</option>
            </select>
            <label className='text-sm mt-4'>What is your prefered language?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.programming_language} onChange={(e) => setUser({ ...user, programming_language: e.target.value })}>
              <option value='None'>Does not apply to me</option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Python'>Python</option>
              <option value='Java'>Java</option>
              <option value='C++'>C++</option>
              <option value='C#'>C#</option>
              <option value='PHP'>PHP</option>
              <option value='Ruby'>Ruby</option>
              <option value='Swift'>Swift</option>
              <option value='Kotlin'>Kotlin</option>
              <option value='R'>R</option>
              <option value='Go'>Go</option>
              <option value='TypeScript'>TypeScript</option>
              <option value='Scala'>Scala</option>
              <option value='C'>C</option>
              <option value='Rust'>Rust</option>
              <option value='Dart'>Dart</option>
              <option value='Perl'>Perl</option>
            </select>

            {ifUserNotComplete() || emailFlag ?
              <button className='bg-gray-500 text-white rounded-md p-2 mt-10' disabled>Start</button> :
              <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-10' onClick={() => {
                console.log(user)
                setPage(1)
              }}>Start</button>}
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 1 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer1: [...answer.answer1, questions[page - 1].answer1] })
                      setTime({ ...time, time1: [...time.time1, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer1: [...answer.answer1, questions[page - 1].answer2] })
                      setTime({ ...time, time1: [...time.time1, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer1: [...answer.answer1, questions[page - 1].answer3] })
                      setTime({ ...time, time1: [...time.time1, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer1: [...answer.answer1, questions[page - 1].answer4] })
                      setTime({ ...time, time1: [...time.time1, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer1.length === 0 | (answer.answer1[answer.answer1.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 2 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer2: [...answer.answer2, questions[page - 1].answer1] })
                      setTime({ ...time, time2: [...time.time2, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer2: [...answer.answer2, questions[page - 1].answer2] })
                      setTime({ ...time, time2: [...time.time2, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer2: [...answer.answer2, questions[page - 1].answer3] })
                      setTime({ ...time, time2: [...time.time2, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer2: [...answer.answer2, questions[page - 1].answer4] })
                      setTime({ ...time, time2: [...time.time2, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer2.length === 0 | (answer.answer2[answer.answer2.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 3 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer3: [...answer.answer3, questions[page - 1].answer1] })
                      setTime({ ...time, time3: [...time.time3, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer3: [...answer.answer3, questions[page - 1].answer2] })
                      setTime({ ...time, time3: [...time.time3, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer3: [...answer.answer3, questions[page - 1].answer3] })
                      setTime({ ...time, time3: [...time.time3, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer3: [...answer.answer3, questions[page - 1].answer4] })
                      setTime({ ...time, time3: [...time.time3, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer3.length === 0 | (answer.answer3[answer.answer3.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 4 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer4: [...answer.answer4, questions[page - 1].answer1] })
                      setTime({ ...time, time4: [...time.time4, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer4: [...answer.answer4, questions[page - 1].answer2] })
                      setTime({ ...time, time4: [...time.time4, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer4: [...answer.answer4, questions[page - 1].answer3] })
                      setTime({ ...time, time4: [...time.time4, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer4: [...answer.answer4, questions[page - 1].answer4] })
                      setTime({ ...time, time4: [...time.time4, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer4.length === 0 | (answer.answer4[answer.answer4.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 5 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer5: [...answer.answer5, questions[page - 1].answer1] })
                      setTime({ ...time, time5: [...time.time5, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer5: [...answer.answer5, questions[page - 1].answer2] })
                      setTime({ ...time, time5: [...time.time5, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer5: [...answer.answer5, questions[page - 1].answer3] })
                      setTime({ ...time, time5: [...time.time5, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer5: [...answer.answer5, questions[page - 1].answer4] })
                      setTime({ ...time, time5: [...time.time5, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer5.length === 0 | (answer.answer5[answer.answer5.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 6 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer6: [...answer.answer6, questions[page - 1].answer1] })
                      setTime({ ...time, time6: [...time.time6, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer6: [...answer.answer6, questions[page - 1].answer2] })
                      setTime({ ...time, time6: [...time.time6, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer6: [...answer.answer6, questions[page - 1].answer3] })
                      setTime({ ...time, time6: [...time.time6, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer6: [...answer.answer6, questions[page - 1].answer4] })
                      setTime({ ...time, time6: [...time.time6, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer6.length === 0 | (answer.answer6[answer.answer6.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 7 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer7: [...answer.answer7, questions[page - 1].answer1] })
                      setTime({ ...time, time7: [...time.time7, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer7: [...answer.answer7, questions[page - 1].answer2] })
                      setTime({ ...time, time7: [...time.time7, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer7: [...answer.answer7, questions[page - 1].answer3] })
                      setTime({ ...time, time7: [...time.time7, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer7: [...answer.answer7, questions[page - 1].answer4] })
                      setTime({ ...time, time7: [...time.time7, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer7.length === 0 | (answer.answer7[answer.answer7.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 8 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer8: [...answer.answer8, questions[page - 1].answer1] })
                      setTime({ ...time, time8: [...time.time8, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer8: [...answer.answer8, questions[page - 1].answer2] })
                      setTime({ ...time, time8: [...time.time8, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer8: [...answer.answer8, questions[page - 1].answer3] })
                      setTime({ ...time, time8: [...time.time8, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer8: [...answer.answer8, questions[page - 1].answer4] })
                      setTime({ ...time, time8: [...time.time8, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer8.length === 0 | (answer.answer8[answer.answer8.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 9 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer9: [...answer.answer9, questions[page - 1].answer1] })
                      setTime({ ...time, time9: [...time.time9, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer9: [...answer.answer9, questions[page - 1].answer2] })
                      setTime({ ...time, time9: [...time.time9, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer9: [...answer.answer9, questions[page - 1].answer3] })
                      setTime({ ...time, time9: [...time.time9, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer9: [...answer.answer9, questions[page - 1].answer4] })
                      setTime({ ...time, time9: [...time.time9, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer9.length === 0 | (answer.answer9[answer.answer9.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 10 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer10: [...answer.answer10, questions[page - 1].answer1] })
                      setTime({ ...time, time10: [...time.time10, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer10: [...answer.answer10, questions[page - 1].answer2] })
                      setTime({ ...time, time10: [...time.time10, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer10: [...answer.answer10, questions[page - 1].answer3] })
                      setTime({ ...time, time10: [...time.time10, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer10: [...answer.answer10, questions[page - 1].answer4] })
                      setTime({ ...time, time10: [...time.time10, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer10.length === 0 | (answer.answer10[answer.answer10.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 11 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer11: [...answer.answer11, questions[page - 1].answer1] })
                      setTime({ ...time, time11: [...time.time11, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer11: [...answer.answer11, questions[page - 1].answer2] })
                      setTime({ ...time, time11: [...time.time11, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer11: [...answer.answer11, questions[page - 1].answer3] })
                      setTime({ ...time, time11: [...time.time11, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer11: [...answer.answer11, questions[page - 1].answer4] })
                      setTime({ ...time, time11: [...time.time11, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer11.length === 0 | (answer.answer11[answer.answer11.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 12 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer12: [...answer.answer12, questions[page - 1].answer1] })
                      setTime({ ...time, time12: [...time.time12, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer12: [...answer.answer12, questions[page - 1].answer2] })
                      setTime({ ...time, time12: [...time.time12, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer12: [...answer.answer12, questions[page - 1].answer3] })
                      setTime({ ...time, time12: [...time.time12, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer12: [...answer.answer12, questions[page - 1].answer4] })
                      setTime({ ...time, time12: [...time.time12, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer12.length === 0 | (answer.answer12[answer.answer12.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 13 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer13: [...answer.answer13, questions[page - 1].answer1] })
                      setTime({ ...time, time13: [...time.time13, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer13: [...answer.answer13, questions[page - 1].answer2] })
                      setTime({ ...time, time13: [...time.time13, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer13: [...answer.answer13, questions[page - 1].answer3] })
                      setTime({ ...time, time13: [...time.time13, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer13: [...answer.answer13, questions[page - 1].answer4] })
                      setTime({ ...time, time13: [...time.time13, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer13.length === 0 | (answer.answer13[answer.answer13.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 14 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer14: [...answer.answer14, questions[page - 1].answer1] })
                      setTime({ ...time, time14: [...time.time14, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer14: [...answer.answer14, questions[page - 1].answer2] })
                      setTime({ ...time, time14: [...time.time14, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer14: [...answer.answer14, questions[page - 1].answer3] })
                      setTime({ ...time, time14: [...time.time14, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer14: [...answer.answer14, questions[page - 1].answer4] })
                      setTime({ ...time, time14: [...time.time14, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer14.length === 0 | (answer.answer14[answer.answer14.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 15 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer15: [...answer.answer15, questions[page - 1].answer1] })
                      setTime({ ...time, time15: [...time.time15, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer15: [...answer.answer15, questions[page - 1].answer2] })
                      setTime({ ...time, time15: [...time.time15, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer15: [...answer.answer15, questions[page - 1].answer3] })
                      setTime({ ...time, time15: [...time.time15, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer15: [...answer.answer15, questions[page - 1].answer4] })
                      setTime({ ...time, time15: [...time.time15, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer15.length === 0 | (answer.answer15[answer.answer15.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {
        // Question 1 page
        page === 16 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            {!showPossibleAnswers ?
              <div className=' text-center pb-7 pt-10 px-10 rounded-lg w-full'>
                <p className='text-xl'>Remember the following phrase!</p>
                <h1 className='text-4xl font-bold mt-20'>{questions[page - 1].question}</h1>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-20 px-10'
                  onClick={
                    () => {
                      setTimeout(() => {
                        setShowPossibleAnswers(true)
                        setStartTime(startTimer())
                      }, 50);
                    }
                  }
                >Ready?</button>
              </div>
              :
              <div className='text-center rounded-lg w-full'>
                <p className='text-xl mb-20 font-bold'>Which phrase you remember?</p>
                <div className='grid grid-cols-2 gap-x-32 gap-y-16 mb-20'>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer16: [...answer.answer16, questions[page - 1].answer1] })
                      setTime({ ...time, time16: [...time.time16, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 1)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)

                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer1}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer16: [...answer.answer16, questions[page - 1].answer2] })
                      setTime({ ...time, time16: [...time.time16, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 2)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)

                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer2}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer16: [...answer.answer16, questions[page - 1].answer3] })
                      setTime({ ...time, time16: [...time.time16, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 3)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)

                          setPage(page + 1)
                        }, 50);
                      }
                    }
                    }
                  >{questions[page - 1].answer3}</p>
                  <p className='text-xl py-4 px-5 hover:bg-green-400 hover:text-white rounded hover:cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 '
                    onClick={() => {
                      setAnswer({ ...answer, answer16: [...answer.answer16, questions[page - 1].answer4] })
                      setTime({ ...time, time16: [...time.time16, endTimer(startTime)] })
                      if (isRightAnswer(page - 1, 4)) {
                        setTimeout(() => {
                          setShowPossibleAnswers(false)
                          setPage(page + 1)
                        }
                          , 50);
                      }
                    }
                    }>{questions[page - 1].answer4}</p>
                </div>
                {answer.answer16.length === 0 | (answer.answer16[answer.answer16.length - 1] == questions[page - 1].correctAnswer) ?
                  <p></p> : <p className='text-red-400 text-sm'>The selected option was wrong, select again!</p>
                }
              </div>
            }
          </div>
        </div>
      }
      {page === 17 &&
        <div className='flex h-5/6 flex-col justify-between items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <div className='flex flex-col justify-center h-full items-center mb-32 w-full'>
            <h1 className='text-2xl'>Please leave feedback</h1>
            <textarea className='w-full h-80 mt-10 px-5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500' onChange={(e) => setFeedback(e.target.value)}></textarea>
            <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2 mt-10 px-10'
              onClick={
                () => {
                  setData(user, answer, time, feedback)
                  setPage(page + 1)
                }
              }
            >Submit</button>
          </div>
        </div>
      }
      {page === 18 && 
        <div className='flex h-5/6 flex-col justify-center items-center xl:w-1/3 md:w-1/2 mx-auto px-10'>
          <h1 className='mb-5 text-3xl font-bold'>Thank you for participating!</h1>
          <p className='mb-32 text-2xl'>💌 From Harkeerat and Mak 💌</p>
        </div>
      }

    </div>
  )
}