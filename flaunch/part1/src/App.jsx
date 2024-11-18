import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";



const dummyData = {
  name: "John Doe",
  heartRate: [80, 82, 79, 85, 83],
  bloodPressure: [
    { systolic: 120, diastolic: 80 },
    { systolic: 122, diastolic: 82 },
    { systolic: 118, diastolic: 78 },
    { systolic: 125, diastolic: 85 },
  ],
  oxygenLevel: [95, 96, 94, 97, 95],
  glucoseLevel: [90, 92, 88, 91, 89],
  temperature: [36.5, 36.7, 36.6, 36.8, 36.9],
  pain: [1, 2, 2, 3, 1],
  height: 175,
  weight: 70,
  bmi: 22.9,
}

const patientComments = {
  '22-10-15':'blood pressure is  low',
  '23-10-15':'severe headache',
  '24-10-15':'weakness in legs',
  '25-10-15':'loose motions'
}
const previousPrescriptions = {
  '22-10-15':'1mg paracitamol',
  '23-10-15':'dolo 700mg',
  '24-10-15':'penicilin',
  '25-10-15':'sumocold',
  '26-10-15':'1mg paracitamol',
  '27-10-15':'dolo 700mg',
  '28-10-15':'penicilin',
  '29-10-15':'sumocold',
  '30-10-15':'1mg paracitamol',
  '31-10-15':'dolo 700mg',
  '32-10-15':'penicilin',
  '33-10-15':'sumocold'
}

const createChartData = (label, data) => ({
    labels: data.map((_, index) => `Time ${index + 1}`),
    datasets: [
      {
        label,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
})


function App() {
  const [count, setCount] = useState(0)
  const [isSideOpenL, setIsSideOpenL] = useState(false)
  const [isSideOpenRP, setIsSideOpenRP] = useState(false)
  const [isSideOpenRC, setIsSideOpenRC] = useState(false)

  const toggleSidebarL = ()=>{
    setIsSideOpenL(!isSideOpenL)
  }
  const toggleSidebarRP = ()=>{
    if(isSideOpenRC) setIsSideOpenRC(!isSideOpenRC)
    setIsSideOpenRP(!isSideOpenRP)
  }
  const toggleSidebarRC = ()=>{
    if(isSideOpenRP) setIsSideOpenRP(!isSideOpenRP)
    setIsSideOpenRC(!isSideOpenRC)
  }

  return (
    <>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
        <p  className='patient'>Patient Name</p>
      </div>

      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#patients">Patients</a></li>
        </ul>
      </div>

      <div className={`sidebarR ${isSideOpenRP ? 'open' : ''}`}>
        <button onClick={toggleSidebarRP} className="close-btn">✖</button>
        <p className="sidebarComm">Previous Prescriptions</p>
        <ul className="sidebar-tabs">
          {Object.entries(previousPrescriptions).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value}</p></div></li>)}
        </ul>
      </div>

      <div className={`sidebarR ${isSideOpenRC ? 'open' : ''}`}>
        <button onClick={toggleSidebarRC} className="close-btn">✖</button>
        <p className="sidebarComm">Patient Comments</p>
        <ul className="sidebar-tabs">
          {Object.entries(patientComments).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value}</p></div></li>)}
        </ul>
      </div>

      <div className='aicomment'>
        <p>Ai Comments</p>
      </div>

      <div className='patientRow'>
        <button className='btn' onClick={()=>{toggleSidebarRP()}}>Previous Prescriptions</button>
        <button className='btn' onClick={()=>{toggleSidebarRC()}}>Patients Comments</button> 
      </div>

      <div className="selectDate">
        Select Date 
        <select onChange={(e)=>console.log(e.target.value)}>
          <option >this week</option> 
          <option >last week</option>
          <option >last month</option>
          <option >last year</option>
        </select> 
      </div>

      <div className="image-container">
        <div className="image-block">
          <div className="chart">
            <h3>Heart Rate</h3>
            <Line data={createChartData("Heart Rate", dummyData.heartRate)} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Blood Pressure</h3>
            <Line
              data={{
                labels: dummyData.bloodPressure.map((_, index) => `Time ${index + 1}`),
                datasets: [
                  {
                    label: "Systolic",
                    data: dummyData.bloodPressure.map((bp) => bp.systolic),
                    borderColor: "rgba(255,99,132,1)",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    fill: true,
                  },
                  {
                    label: "Diastolic",
                    data: dummyData.bloodPressure.map((bp) => bp.diastolic),
                    borderColor: "rgba(54,162,235,1)",
                    backgroundColor: "rgba(54,162,235,0.2)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Oxygen Level</h3>
            <Line data={createChartData("Oxygen Level", dummyData.oxygenLevel)} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Glucose Level</h3>
            <Line data={createChartData("Glucose Level", dummyData.glucoseLevel)} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Temperature</h3>
            <Line data={createChartData("Temperature", dummyData.temperature)} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Pain</h3>
            <Line data={createChartData("Pain", dummyData.pain)} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
      </div>

      <div className='lastDetail'>
        <p>Height: {dummyData.height} cm</p>
        <p>Weight: {dummyData.weight} kg</p>
        <p>BMI: {dummyData.bmi}</p>
      </div>
      <div>    </div>

    </>
  )
}

export default App
