import React, { useMemo, useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import Chart from "react-google-charts";
import MOCK_DATA from './jsondata.json';



export const Charts = () => {

    const urlApi = "https://localhost:44352/api/parser";
    const [jsonData , setData]=useState([]);
    


    const requestGet=async()=>{
        await axios.get(urlApi)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

    useEffect(() => {
        requestGet();
      }, [])


  //const jsonData            = useMemo(() => MOCK_DATA, [])
  var countIPs              = jsonData.reduce( (acc, o) => (acc[o.ipSourceAddr] = (acc[o.ipSourceAddr] || 0)+1, acc), {} );
  console.log(jsonData);
  // Severity Count

  var countAbuseIP          = jsonData.reduce( (acc, o) => (acc[o.abuseConfidence] = (acc[o.abuseConfidence] || 0)+1, acc), {} );
  var resultArray           = Object.keys(countIPs).map((key) => [String(key), countIPs[key]]);
  var resultArrayConfidence = Object.keys(countAbuseIP).map((key) => [String(key), countAbuseIP[key]]);

  var uniqs                 = resultArray.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  })
  var totalEvents          = Object.values(countIPs);

  // IPs per Country

  var countCountries       = jsonData.reduce( (acc, o) => (acc[o.countryName] = (acc[o.countryName] || 0)+1, acc), {} );
  var resultArrayCountries = Object.keys(countCountries).map((key) => [String(key), countCountries[key]]);
  let totalEventsSum       = totalEvents.reduce((a, b) => a + b, 0);
  var uniqueIPs            = uniqs.length;
  const constValuesPie     = [['Name', 'Count']];
  var countriesChart       = constValuesPie.concat(resultArrayCountries); 
  var severityChart        = constValuesPie.concat(resultArrayConfidence);

  return (
    <div className="App">
      <header><h1>_________________________________________________________________________________________________________</h1></header>
      <header><h1>Event Log Summary</h1></header>
      <h2>Unique IPs</h2>
      <h2>{uniqueIPs}</h2>
      <h2>TotalEvents</h2>
      <h2>{totalEventsSum}</h2>
    <div>
      
    
      
    <Chart
          width={'800px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={severityChart}
        
          options={{
          title: 'Severity Count',

        }}
       rootProps={{ 'data-testid': '2' }}
/>
</div>
<div margin-right= "50px">
    <Chart
          width={'800px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={countriesChart}
          options={{
          title: 'IPs per Country',

        }}
       rootProps={{ 'data-testid': '2' }}
/>
</div>
    </div>
  );
}
