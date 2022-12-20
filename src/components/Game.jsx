import React, {useState} from 'react'
import logo from '../assets/logo2.png'

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

  function ifUserNotComplete() {
    if (user.name === '' || user.email === '' || user.relatinship === '') {
      return true
    } else {
      return false
    }
  }

  const [answer, setAnswer] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
    answer7: '',
    answer8: '',
    answer9: '',
    answer10: '',
    answer11: '',
    answer12: '',
    answer13: '',
    answer14: '',
    answer15: '',
  })

  const [page, setPage] = useState(0)

  return (
    <div className='w-full'>
      <img src={logo} alt='logo' className='mx-auto mt-10 h-20'/>
      {page === 0 && 
        <div className='flex flex-col items-center xl:w-1/3 lg:w-1/3 md:w-1/2 mx-auto px-10'>
          <h1 className='text-2xl font-bold mt-16'>Welcome to case survey!</h1>
          <p className='text-sm mt-5'>Please fill out the form below to start the game.</p>
          <div className='flex flex-col mt-10 w-full'>
            <label className='text-sm'>Name</label>
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1'value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
            <label className='text-sm mt-4'>Email address</label>
            {emailFlag && <p className='text-red-500 text-xs'>Please enter a valid email address</p>}
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1'value={user.email} onChange={
              (e) => {
                if (e.target.value.includes('@')) {
                  setEmailFlag(false)
                  setUser({...user, email: e.target.value})
                } else {
                  setEmailFlag(true)
                  setUser({...user, email: e.target.value})
                }
            }}/>
            <label className='text-sm mt-4'>What is your occupation?</label>
            <input type='text' className='border-2 border-gray-300 rounded-md p-2 mt-1'value={user.relatinship} onChange={(e) => setUser({...user, relatinship: e.target.value})}/>
            <label className='text-sm mt-4'>Programming experience?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.programming_experience} onChange={(e) => setUser({...user, programming_experience: e.target.value})}>
              <option value='None'>Never coded</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
            </select>
            <label className='text-sm mt-4'>What case you prefer?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.case} onChange={(e) => setUser({...user, case: e.target.value})}>
              <option value='None'>Does not apply to me</option>
              <option value='camelcase'>camelCase</option>
              <option value='snakecase'>snake_case</option>
              <option value='kebabcase'>kebab-case</option>
              <option value='pascalcase'>PascalCase</option>
              <option value='dotcase'>dot.case</option>
              <option value='pathcase'>path/case</option>
            </select>
            <label className='text-sm mt-4'>What is your prefered language?</label>
            <select className='border-2 border-gray-300 rounded-md p-2 mt-1' value={user.programming_language} onChange={(e) => setUser({...user, programming_language: e.target.value})}>
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
    </div> 
  )
}