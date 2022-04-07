import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Loader from './Components/Hrmloader/Loader';
function App() {
  const Login = React.lazy(() => import('../src/Pages/Login/Login'));
  const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'));
  const EmployeeAdd = React.lazy(() => import('./Pages/Employee/EmployeeAdd'));
  const InterviewSchedule = React.lazy(() => import('./Pages/InterviewSchedule/InterviewSchedule'));
  const EmployeeList = React.lazy(() => import('./Pages/Employee/EmployeeList'));
  const InterviewTableData = React.lazy(() => import('./Pages/InterviewTableData/InterviewTableData'));
  const Interviewupdate = React.lazy(() => import('./Pages/InterviewSchedule/InterviewUpdate'));
  const UpdateEmployee = React.lazy(() => import('./Pages/Employee/UpdateEmployee'))
  const AddEvent = React.lazy(() => import('./Pages/Events/AddEvent/AddEvent'));
  const EventList = React.lazy(() => import('./Pages/Events/EventList/EventList'));
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path='*' element={<Login />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/addemployee' element={<EmployeeAdd />} />
            <Route path='/interviewschedule' element={<InterviewSchedule />} />
            <Route path='/allemployee' element={<EmployeeList />} />
            <Route path='/interviewtabledata' element={<InterviewTableData />} />
            <Route path='/interviewupdate/:id' element={<Interviewupdate />} />
            <Route path='/update-emp/:id' element={<UpdateEmployee />}></Route>
            <Route path='/add-event' element={<AddEvent />}></Route>
            <Route path='/all-events' element={<EventList />}></Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}
export default App;
