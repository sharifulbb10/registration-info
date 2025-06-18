import React, { useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

function Registration() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// GOOGLE SHEET - https://docs.google.com/spreadsheets/d/1-rZTeP3qAwAT1Znvz6qpNRhAiVIpfaDONzDMnWlTH2s/edit?gid=2100981573#gid=2100981573
	const fetchData = async () => {
		try{
			const response = await fetch('https://docs.google.com/spreadsheets/d/1-rZTeP3qAwAT1Znvz6qpNRhAiVIpfaDONzDMnWlTH2s/gviz/tq?tqx=out:json');
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
  		text: "Registration List",
  		ease: "none",
  		repeat: -1,
  		repeatDelay: 3,
  		});

  		gsap.to(headerRef2.current, {
  			duration: 3,
  			text: "Find your name in this list soon! Register fast!",
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
		<div>
			<div>
				<h2 className="text-center mt-8 text-xs font-semibold text-teal-700">শাহ্ রাহাত আলী উচ্চবিদ্যালয় - ব্যাচ ২০১৬<br/>১০ বছর পূর্তি উদযাপন</h2>
			</div>
			<div className="w-[95vw] mx-auto bg-green-200 py-3 mt-5 rounded">
				<div className="flex justify-center"><span ref={headerRef1}></span><span className="font-light not-italic" ref={cursor1}>|</span></div>
				<div className="flex justify-center italic text-xs text-zinc-700"><span ref={headerRef2}></span><span className="font-light not-italic" ref={cursor2}>|</span></div>
			</div>

			<table className="table w-[95vw] text-[9px] md:text-xs lg:text-sm mx-auto my-5 mx-1 border-1 text-right">
				<tbody className="">
					<tr className="table-head text-center bg-cyan-100">
						<th className="border-1 border-collapse p-1">SL No.</th>
						<th className="border-1 border-collapse p-1">Date</th>
						<th className="border-1 border-collapse p-1">কে টাকা দিয়েছে</th>
						<th className="border-1 border-collapse p-1">Phone No.</th>
						<th className="border-1 border-collapse p-1">কত টাকা দিয়েছে</th>
						<th className="border-1 border-collapse p-1">কাকে টাকা দিয়েছে</th>
					</tr>

					

					{data.map((eachItem, index)=>{
						return <tr key={index} className="odd:bg-purple-100 even:bg-orange-100">
							<td className="border-1 border-collapse p-1">{index+1}</td>
							<td className="border-1 border-collapse p-1">{extractDate(eachItem[0])}</td>
							<td className="border-1 border-collapse p-1">{eachItem[2]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[3]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[4]}</td>
							<td className="border-1 border-collapse p-1">{eachItem[5]}</td>
						</tr>
					})}

					<tr className="bg-cyan-100">
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1 font-bold">Total = {data.length}</td>
						<td  className="border-1 border-collapse p-1"></td>
						<td  className="border-1 border-collapse p-1 font-bold">Total = {data[0][6]!='Total'? data[0][6]:0}</td>
						<td  className="border-1 border-collapse p-1"></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Registration