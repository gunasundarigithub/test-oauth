import React, { Component } from 'react'
import Table from './VirtualizedTable';
import Button from './Button'
import axios from '../Axios'

class ScenarioPage extends Component {

  state={
    tableData : [],
    
  }


  getTableData = () => {
    console.log("ScenarioPage===> "+this.props.Assignment_group);
    // alert("please enter correct assignment group");
    axios
    .get(`api/365388/getincidentslist/${this.props.Assignment_group}`)
     .then((response) => {this.setState({tableData: response.data.result });
     console.log( response.data.result) }
     ).catch(error => {
      console.log(error);
    });
  }

   componentDidMount(){
     this.getTableData();
   }

  // componentWillUnmount(){
  //   console.log("came inside component will unmount");
  // }

   date_diff_indays = (date2, date1)  => {
    let dt1 = new Date(date1);
    let  dt2 = new Date(date2);
    const diff= Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    console.log("Difference is ====>"+diff)
    return diff
    }

    myDateFunction = (recordDate) => {
    let tempDate = null;
    if(recordDate == 'Today')
    {
       tempDate = new Date();
    }
    else 
    {
     tempDate = new Date(recordDate);
    }
    const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    return date
  }


  //Testing purpose we are using opened date. it must be updated date
  scenario1Handler = () => {  
     console.log("************Scenaro 1 **************")
      const response_data = [...this.state.tableData]
      const post_resp_data = {
        u_status: "Resolved",
        close_notes: "Closed as no response from member for past 7 days",
      };
      const Currentdate = this.myDateFunction("Today");
      let MSR_Incident_Count = 0;
      console.log(response_data);
      const Total_Incident_Count = response_data.length;
      console.log("Total incident count is => "+Total_Incident_Count)
      response_data.map((record) => {
       if(record.Userid != null || record.Userid != '')
       {
          MSR_Incident_Count++;
              if(record.state == 'awaiting user info' && record.count == 'true')
                  {
                   console.log("Record numnber is ********"+record.number)
                   const datediff = this.date_diff_indays(Currentdate,record.opened_date);
                   console.log(datediff)
                   if(datediff >7 )
                    {
                      console.log("****Date diff is more than 7 days****")
                      axios.put(`api/now/table/incident/${record.sys_id}`, post_resp_data)
                          .then(response => {
                                                console.log(response);
                                                if(response.status == 200)
                                                {
                                                  console.log("Response is 200 ******")
                                                  console.log(response.data.result.number);
                                                  record.comment=post_resp_data.close_notes;
                                                  record.state=post_resp_data.u_status;
                                                  const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                                  console.log("Data here is ******===> "+record_index)
                                                  response_data[record_index] = record

                                                  this.setState({tableData:response_data})
                                                }
                                            });
                                          }
                                          else if(datediff <7 ){
                                            record.comment="It has not been seven days since we sent mail to MSR";
                                          const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                                  console.log("Data here is ******===> "+record_index)
                                                  response_data[record_index] = record

                                                  this.setState({tableData:response_data})
                                          }
                                        }
                                       }
                                      }
                                    )
                                    console.log("MSR_Incident_Count is "+MSR_Incident_Count);
                                    console.log("************Scenario 1 ends here*****************")
                                   
                                  }


  scenario2Handler = (record) => {  
    console.log("************Scenaro 2 **************")
    const response_data = [...this.state.tableData];
    const Total_Incident_Count = response_data.length;
    let MSR_Incident_Count = 0;

    const app =['logon_application','insurance_app','message_application'];
    const app_to_detailsgiven = {

      // Accounts_Title : [""],
      logon_application : ["channel","mobileapp","dotcom","version","time_frame","time","frame"],
      insurance_app : ["vehicle_number","area","code","nameplate","policy","number","renewal","time","frame","version"],
      message_application : ["time","frame","onlineid","mobilenumber","phone","number","text","sms"],
      // External_Account_Aggregation : ["steps to add","not supported"]
      
    }

    const issue_to_keyword = {

      logon_application : ["password","expires","expired","incorrect","invalid","login","unable",
     "enable","classic","logon","onlineid","security","quetions","login"],
     insurance_app:["vehicle","nameplate","policynumber","manufacturer",
     "auto","renewal","policynumber","createddate"],
     message_application : ["minimum","balance","below","zero","transactions",
      "notifications","quiet_time","receiveing","early_morning","alerts"]
    }

   

    const issue_to_KB = {

      logon_application :"KB0001",
      insurance_app : "KB0002",
      message_application:"KB0003",
      policy_renewal:"KB0004",
      notification_preferences :"KB0005",
      quiet_timesetup:"KB0006"
      
    }

    
    response_data.map((record) =>
     {
      
if(record.Userid != null || record.Userid != '')
      {
        console.log("Came inside 1st if")

        MSR_Incident_Count++;
        if(record.state == 'open')
            {
              console.log("Came inside 2nd if")

              const application_name= record.Application_name;
              console.log("Application name  is ****** "+application_name)
              const short_description= record.short_description;
              const Description = record.Description;
            console.log("description is ****** "+Description)
            var percent_array = new Object();
              app.map((item)=>{
                if (application_name===item){
                  console.log("matched");
                  const keywords = issue_to_keyword[item];
                  console.log(keywords)
                  let match_keywords= 0;
                  const keywords_length = keywords.length;
                  console.log("Keyword Length is "+keywords_length);
                  keywords.map((keyword) => {
                    console.log("Keyword "+keyword); 
                    console.log("description "+Description);
                    if(Description.includes(keyword))
                    {
                      console.log("Divyaa...comingg..."); 
                      match_keywords++;
                    }
                    console.log("Match Keyword count is "+match_keywords);
                  })
                  percent_array[item] = ((match_keywords/keywords_length)*100);
                }
                // const keywords = app_to_detailsgiven[item];
              
              })
             
              if(percent_array != null || percent_array != ''  )
              {
                let arr = Object.values(percent_array);
                let min_percent = Math.min(...arr);
                let max_percent = Math.max(...arr);
                console.log("Max percentage issue is "+max_percent)
                if(max_percent >= 30 )
                    {
                    var max_percent_issue = Object.keys(percent_array).reduce((a, b) => percent_array[a] > percent_array[b] ? a : b);
                    console.log("Max percentage value issue is "+max_percent_issue)
      
                    const KB_details = issue_to_KB[max_percent_issue];
                    console.log("The KB which needs to be sent is "+KB_details)
                    console.log("Prencent array inside else is ")
                    console.log(percent_array)


                    console.log("Send the canned message for Max perecnet issue")
                    const post_resp_data2 = {
                      u_status: "Resolved",
                      close_notes: `It is known issue please follow this ${KB_details}`,
                    };
                    axios.put(`api/now/table/incident/${record.sys_id}`, post_resp_data2)
                          .then(response => {
                                                console.log(response);
                                                if(response.status == 200)
                                                {
                                                  console.log("Response is 200 ******")
                                                  console.log(response.data.result.number);
                                                  record.comment=post_resp_data2.close_notes;
                                                  record.state=post_resp_data2.u_status;
                                                  const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                                  console.log("Data here is ******===> "+record_index)
                                                  response_data[record_index] = record

                                                  this.setState({tableData:response_data})
                                                }
                                            });

                return 
                  // we must return something here if, the condition satisfies 
                }
               if(max_percent <=30 )
                    {
                    
                      var max_percent_issue = Object.keys(percent_array).reduce((a, b) => percent_array[a] > percent_array[b] ? a : b);
                    console.log("Max percentage value issue is "+max_percent_issue)
      
                    // const KB_details = issue_to_KB[min_percent_issue];
                    // console.log("The KB which needs to be sent is "+KB_details)
                    // console.log("Prencent array inside else is ")
                    // console.log(percent_array)

                    
                    // console.log("Send the canned message for Max perecnet issue")
                    const post_resp_data2 = {
                      u_status: "Awaiting user info",
                      close_notes: `sent mail to customer for more info`,
                      u_count:true
                    };
                    axios.put(`api/now/table/incident/${record.sys_id}`, post_resp_data2)
                          .then(response => {
                                                console.log(response);
                                                if(response.status == 200)
                                                {
                                                  console.log("Response is 200 ******")
                                                  console.log(response.data.result.number);
                                                  record.comment=post_resp_data2.close_notes;
                                                  record.state=post_resp_data2.u_status;
                                                  record.count=post_resp_data2.u_count;
                                                  const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                                  console.log("Data here is ******===> "+record_index)
                                                  response_data[record_index] = record

                                                  this.setState({tableData:response_data})
                                                }
                                            });

                return 
                  // we must return something here if, the condition satisfies 
                }
               


              }
                console.log("Precent array inside if is ")
                console.log(percent_array)
                console.log("Send mail to Application  SME for that ")
              
            }

       }
     })
    }

    scenario3Handler = (record) => {
      console.log("************Scenaro 3 **************")
      const response_data = [...this.state.tableData];
      const Total_Incident_Count = response_data.length;
      let MSR_Incident_Count = 0;
      const app_to_issue = {
  
        // Accounts_Title : [""],
        logon_application : ["password_expired","classic_logon"],
        insurance_app : ["vehicle_insurance","policy_renewal"],
        message_application : ["notification_preferences","quiet_timesetup"],
        // External_Account_Aggregation : ["steps to add","not supported"]
        
      }
  
      const issue_to_keyword = {
  
        password_expired : ["password","expires","expired","incorrect","invalid","login","unable"],
        classic_logon : ["enable","classic","logon","onlineid","security","quetions","login"],
        vehicle_insurance:["vehicle","nameplate","policynumber","manufacturer"],
        policy_renewal:["auto","renewal","policynumber","createddate"],
        notification_preferences : ["minimum","balance","below","zero","transactions"],
        quiet_timesetup:["notifications","quiet_time","receiveing","early_morning"]
      }
  
  
      const issue_to_KB = {
  
        password_expired :"KB0001",
        classic_logon : "KB0002",
        vehicle_insurance:"KB0003",
        policy_renewal:"KB0004",
        notification_preferences :"KB0005",
        quiet_timesetup:"KB0006"
        
      }
  
      console.log("App to issue is "+app_to_issue["Logon_Application"])
      response_data.map((record) =>
       {
        const application_name= record.Application_name;
         console.log(record)
        if(record.Userid != null || record.Userid != '')
        {
          console.log("Came inside 1st if")
  
          MSR_Incident_Count++;
          if(record.state == 'work in progress' && record.count == 'true')
              {
                console.log("Came inside 2nd if")
  
               
                console.log("Application name  is ****** "+application_name)
  
                const latest_update = record.latest_update;
                console.log("Latest update is ****** "+latest_update)
                const issues= app_to_issue[application_name];
                var percent_array = new Object();
                issues.map((item)=>{
                  const keywords = issue_to_keyword[item];
                  console.log("Keywords are "+keywords)
                  let match_keywords= 0;
                  const keywords_length = keywords.length
                  console.log("Keyword Lenght is "+keywords_length);
                  keywords.map((keyword) => {
                    console.log("Keyword "+keyword); 
                    console.log("latest_update "+latest_update);
                    if(latest_update.includes(keyword))
                    {
                      console.log("Divyaa...comingg..."); 
                      match_keywords++;
                    }
                    console.log("Match Keyword count is "+match_keywords);
                  })
                  percent_array[item] = ((match_keywords/keywords_length)*100);
                })
               
                if(percent_array != null || percent_array != ''  )
                {
                  let arr = Object.values(percent_array);
                  //let min = Math.min(...arr);
                  let max_percent = Math.max(...arr);
                  console.log("Max percentage issue is "+max_percent)
                  if(max_percent != 0 )
                      {
                      var max_percent_issue = Object.keys(percent_array).reduce((a, b) => percent_array[a] > percent_array[b] ? a : b);
                      console.log("Max percentage value issue is "+max_percent_issue)
        
                      const KB_details = issue_to_KB[max_percent_issue];
                      console.log("The KB which needs to be sent is "+KB_details)
                      console.log("Prencent array inside else is ")
                      console.log(percent_array)
  
                      console.log("Send the canned message for Max perecnet issue")
                      const post_resp_data2 = {
                        u_status: "Resolved",
                        close_notes: `It is known issue please follow this ${KB_details}`,
                      };
                      axios.put(`api/now/table/incident/${record.sys_id}`, post_resp_data2)
                            .then(response => {
                                                  console.log(response);
                                                  if(response.status == 200)
                                                  {
                                                    console.log("Response is 200 ******")
                                                    console.log(response.data.result.number);
                                                    record.comment=post_resp_data2.close_notes;
                                                    record.state=post_resp_data2.u_status;
                                                    const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                                    console.log("Data here is ******===> "+record_index)
                                                    response_data[record_index] = record
  
                                                    this.setState({tableData:response_data})
                                                  }
                                              });
  
                  return 
                    // we must return something here if, the condition satisfies 
                  }
                
                }
                
                const post_resp_data2 = {
                  u_latest_update: `sent mail to the SME's for the Ticket`,
                };
                axios.put(`api/now/table/incident/${record.sys_id}`, post_resp_data2)
                      .then(response => {
                                            console.log(response);
                                            if(response.status == 200)
                                            {
                                              console.log("Response is 200 ******")
                                              console.log(response.data.result.number);
                                              record.comment=post_resp_data2.u_latest_update;
                                              const record_index = this.state.tableData.findIndex(item => item.number == record.number);
                                              console.log("Data here is ******===> "+record_index)
                                              response_data[record_index] = record

                                              this.setState({tableData:response_data})
                                            }
                                        });
                  console.log("Prencent array inside if is ")
                  console.log(percent_array)
                  alert(`I have sent mail to the SME's for the Ticket. It was in ${application_name}. The ticket number is ${record.number}`,)
                
              }
  
         }
       })
      }



 

 render(){


 return(
 <div>
           
          <Button colour="primary"  clicked={this.scenario1Handler} >AUI_state</Button>
          <Button colour="primary" clicked={this.scenario2Handler}>Open_state</Button> 
           <Button colour="primary" clicked={this.scenario3Handler}>In_progress_state</Button>
          <Table tableData={this.state.tableData} /> 
        </div>)
        
        
    }

}

export default ScenarioPage;