import React, { useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

function Transaction() {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// GOOGLE SHEET - https://docs.google.com/spreadsheets/d/1Qpz5spJvBiIIojnorELqNtOpxNZOwuys9teoRAc4WBY/edit?gid=1958104623#gid=1958104623
	const fetchData = async () => {
		try{
			const response = await fetch('https://docs.google.com/spreadsheets/d/1Qpz5spJvBiIIojnorELqNtOpxNZOwuys9teoRAc4WBY/gviz/tq?tqx=out:json');
			const text = await response.text();
			const json = JSON.parse(text.substring(47).slice(0, -2)); 
			const rows = json.table.rows.map(row => row.c.map(cell => (cell? cell.v : "")));
			setData(rows); 			// 'data' state update
			setLoading(!loading); 	// 'loading' state update
		}
		catch(error){
			console.log("error occured", error);
		}
 	}

 	useEffect(()=>{
 		fetchData();
 	}, [])

 	// date function
 	function extractDate(dateString) {
 	if (dateString !== "Timestamp")	{
	 		const numbers =(dateString.match(/\d+/g).map(Number)) ? dateString.match(/\d+/g).map(Number): "";
	 		const formattedDate = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
	 		return formattedDate;
	 	} else {
	 		return "";
	 	}
  	}

  	gsap.registerPlugin(useGSAP, TextPlugin); 
  	const container = useRef();
  	const headerRef1 = useRef();
  	const headerRef2 = useRef();
  	const cursor1 = useRef();
  	const cursor2 = useRef();
  	useGSAP(()=>{
  		// animation
  		gsap.to(headerRef1.current, {
  		duration: 3, 
  		text: "CENTRAL ACCOUNT INFO",
  		ease: "none",
  		repeat: -1,
  		repeatDelay: 3,
  		});

  		gsap.to(headerRef2.current, {
  			duration: 3,
  			text: "See what financial occurances are happening live!",
  			ease: "none",
  			repeat: -1,
  			repeatDelay: 3,
  		});

  		gsap.to(cursor1.current, {
  			opacity: 0,
	      	duration: 0.5,
	      	repeat: -1, 
	      	yoyo: true, 
	      	ease: "power1.inOut"
  		})

  		gsap.to(cursor2.current, {
  			opacity: 0,
	      	duration: 0.5,
	      	repeat: -1, 
	      	yoyo: true, 
	      	ease: "power1.inOut"
  		})

  	}, {dependencies: [loading], scope: container});

 	if (loading) {
 		return (
 			<div className="w-full h-[100vh] flex justify-center items-center text-rose-800 text-sm">Data fetching...Please Wait!</div>
 		)
 	}

	return (
		<div className="overflow-scroll">
			<div>
				<h2 className="text-center mt-8 text-xs font-semibold text-teal-700">শাহ্ রাহাত আলী উচ্চবিদ্যালয় - ব্যাচ ২০১৬<br/>১০ বছর পূর্তি উদযাপন</h2>
			</div>
			<div className="w-[95vw] mx-auto bg-green-200 my-3 py-3 rounded min-h-18" ref={container}>
				<div className="header1 flex justify-center text-sm"><span className=""  ref={headerRef1}></span><span className="not-italic text-black font-extrabold text-green-700" ref={cursor1}>|</span></div>
				<div className="header2 flex justify-center italic text-xs"><span className=""  ref={headerRef2}></span><span className="not-italic text-black font-extrabold text-green-700" ref={cursor2}>|</span></div>
			</div>
			<table className="table w-[95vw] text-[10px] md:text-xs lg:text-sm mx-auto mb-5 mx-1 border-1 text-right">
			<tbody>
				<tr className="table-head text-center bg-cyan-100">
					<th className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">Date</th>
					<th className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (+)</th>
					<th className="cash-withdrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (-)</th>
					<th className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7">Remarks</th>
				</tr>

				{/*<tr className="table-head text-right">
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">Date</td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (+)</td>
					<td className="cash-witddrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">Cash (-)</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7 text-left">Remarks</td>
				</tr>*/}

				{data.map((eachItem, index) => {
					return <tr className="table-head text-right odd:bg-purple-100 even:bg-orange-100" key={index}>
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7">{extractDate(eachItem[0])}</td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7">{eachItem[2]==""? 0:eachItem[2]}</td>
					<td className="cash-witddrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7">{eachItem[3]==""? 0:eachItem[3]}</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7 text-left">{eachItem[4]}<br/>{eachItem[5]}</td>
					</tr>
				})}				

				<tr className="table-end text-right bg-cyan-100">
					<td className="date w-1/8 p-1 self-center border-1 border-collapse min-h-7"></td>
					<td className="cash-received w-2/8 p-1 self-center border-1 border-collapse min-h-7 font-bold">Total = {data[0][6]}</td>
					<td className="cash-withdrawn w-2/8 p-1 self-center border-1 border-collapse min-h-7 font-bold">Total = {data[0][7]}</td>
					<td className="remarks w-3/8 p-1 self-center border-1 border-collapse min-h-7"></td>
				</tr>
			</tbody>
			</table>
		</div>
	)
}

export default Transaction