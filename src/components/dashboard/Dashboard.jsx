import React from 'react';
// import TicketsChart from './TicketsChart';
// import EventsChart from './EventsChart';
import TicketStatistics from './TicketStatistics';

function Dashboard() {
    return (
        <div>
            <h1>Ticket Sales and Event Bookings Dashboard</h1>
            {/*<TicketsChart />*/}
            {/*<EventsChart />*/}
            {/*<TicketStatistics />*/}
        </div>
    );
}

export default Dashboard;
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Card,
//     CardBody
// } from "@material-tailwind/react";
//
// import {
//     UserGroupIcon,
// } from "@heroicons/react/24/solid";
//
// import { MdOutlineBoy } from "react-icons/md";
// import { MdOutlineGirl } from "react-icons/md";
//
// import { StatisticsCard } from "@/widgets/cards";
//
// export function Home() {
//
//     const [totParticipants, setTotParticipants] = useState(0);
//     const [maleParticipants, setMaleParticipants] = useState(0);
//     const [femaleParticipants, setFemaleParticipants] = useState(0);
//
//     const [totResevations, setTotResevations] = useState(0);
//     const [maleResevations, setMaleResevations] = useState(0);
//     const [femaleResevations, setFemaleResevations] = useState(0);
//
//     const [totApprovals, setTotApprovals] = useState(0);
//     const [maleApprovals, setMaleApprovals] = useState(0);
//     const [femaleApprovals, setFemaleApprovals] = useState(0);
//
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${VITE_API}/tickets/stats/`, config);
//                 const data = response.data;
//                 console.log(response)
//                 // Set state values from the API response
//
//                 setTotParticipants(data.totParticipans);
//                 setMaleParticipants(data.maleParticipants);
//                 setFemaleParticipants(data.femaleParticipants);
//
//                 const response1 = await axios.get(`${VITE_API}/tickets/stats/reservations`, config);
//                 const data1 = response1.data;
//                 console.log(response1);
//
//                 setTotResevations(data1.totReservations);
//                 setMaleResevations(data1.maleReservations);
//                 setFemaleResevations(data1.femaleReservations);
//
//                 const response2 = await axios.get(`${VITE_API}/tickets/stats/approvals`, config);
//                 const data2 = response2.data;
//                 console.log(response2);
//
//                 setTotApprovals(data2.totApprovalDetails);
//                 setMaleApprovals(data2.maleApprovalDetails);
//                 setFemaleApprovals(data2.femaleApprovalDetails);
//
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         const intervalId = setInterval(() => {
//             fetchData();
//         }, 10000); // 5 minutes in milliseconds
//
//         fetchData();
//
//         return() => clearInterval(intervalId);
//         // updateData();
//     }, []); // Empty dependency array ensures that this effect runs once when the component mounts
//
//
//
//     return (
//         <div className="mt-12">
//             {/* {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
//           <StatisticsCard
//             key={title}
//             {...rest}
//             title={title}
//             icon={React.createElement(icon, {
//               className: "w-6 h-6 text-white",
//             })}
//             footer={
//               <Typography className="font-normal text-blue-gray-600">
//               <strong className={footer.color}>{footer.value}</strong>
//               &nbsp;{footer.label}
//               </Typography>
//             }
//             />
//           ))} */}
//             {/* <StatisticsCard
//             title="Total Participants"
//             icon={React.createElement(icon, {
//               className: "w-6 h-6 text-white",
//             })}
//             value={totParticipants}
//           /> */}
//             <Card>
//                 <CardBody>
//                     <h3 class="text-3xl font-extrabold dark:text-white">PARTICIPANT STATISTICS</h3>
//                     <div className="mt-10 mb-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
//
//                         <StatisticsCard
//                             color="green"
//                             icon= {<UserGroupIcon className='w-12 h-12'/>}
//                             title="Total Participants"
//                             value = {totParticipants}
//                             footer = ""
//                         />
//
//                         <StatisticsCard
//                             color="blue"
//                             icon= {<MdOutlineBoy className='w-12 h-12'/>}
//                             title="Male Participants"
//                             value = {maleParticipants}
//                             footer = ""
//                         />
//
//                         <StatisticsCard
//                             color="pink"
//                             icon= {<MdOutlineGirl className='w-12 h-12'/>}
//                             title="Female Participants"
//                             value = {femaleParticipants}
//                             footer = ""
//                         />
//                     </div>
//                 </CardBody>
//
//             </Card>
//
//             <Card className='mt-10'>
//                 <CardBody>
//                     <h3 class="text-3xl font-extrabold dark:text-white">RESERVATION STATISTICS</h3>
//                     <div className="mt-10 mb-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3"><StatisticsCard
//                         color="purple"
//                         icon= {<UserGroupIcon className='w-12 h-12'/>}
//                         title="Total Reservarions"
//                         value = {totResevations}
//                         footer = ""
//                     />
//
//                         <StatisticsCard
//                             color="blue"
//                             icon={<MdOutlineBoy className='w-12 h-12'/>}
//                             title="Male Reservarions"
//                             value = {maleResevations}
//                             footer = ""
//                         />
//
//                         <StatisticsCard
//                             color="pink"
//                             icon= {<MdOutlineGirl className='w-12 h-12'/>}
//                             title="Female Reservarions"
//                             value = {femaleResevations}
//                             footer = ""
//                         />
//                     </div>
//                 </CardBody></Card>
//
//             <Card className='mt-10'>
//                 <CardBody>
//                     <h3 class="text-3xl font-extrabold dark:text-white">APPROVAL STATISTICS</h3>
//                     <div className="mt-10 mb-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
//                         <StatisticsCard
//                             color="red"
//                             icon= {<UserGroupIcon className='w-12 h-12'/>}
//                             title="Total Approvals"
//                             value = {totApprovals}
//                             footer = ""
//                         />
//
//                         <StatisticsCard
//                             color="blue"
//                             icon= {<MdOutlineBoy className='w-12 h-12'/>}
//                             title="Male Approvals"
//                             value = {maleApprovals}
//                             footer = ""
//                         />
//
//                         <StatisticsCard
//                             color="pink"
//                             icon= {<MdOutlineGirl className='w-12 h-12'/>}
//                             title="Female Approvals"
//                             value = {femaleApprovals}
//                             footer = ""
//                         />
//
//                     </div>
//                 </CardBody>
//             </Card>
//
//
//
//         </div>
//     );
// }
//
// export default Home;
//
