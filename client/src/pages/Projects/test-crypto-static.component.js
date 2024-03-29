import React, { useState } from "react"
import { ethers } from "ethers"
import { Link, useParams } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import {getETHPrice} from "./getETHPrice";
import { updateProjectFundRaised } from "../../actions/Projects/ProjectCrud.actions";

const Cryptotest = (props) => {
   const [amount, setAmount] = useState(0) // new line
   const location = useLocation();
   const dispatch=useDispatch();
   const id = useSelector((state) => state.projects.id);
   const adresse = useSelector((state) => state.projects.adresse);

   console.log(id);
   // const [default_ADDRESS, setFundneeded] = useState(location.state.fundneeded);
   const [destinationAddress, setDestinationAddress] = useState(adresse.adresse) ;// new line
   // const [destinationAddress, setDestinationAddress] = useState(location.state.adresseCrypto) ;// new line
   const [error, setError] = useState("") //newline
   const { user: currentUser } = useSelector((state) => state.auth);

   const [transaction, setTransaction] = useState(null) // new line
 
 
   // const [fundcollected, setFundcollected] = useState(location.state.fundcollected);
   let transactionUrl = ""
 
   if (transaction?.hash) {
     transactionUrl = `https://${
       transaction.network?.name === "homestead"
         ? ""
         : transaction.network?.name + "."
     }etherscan.io/tx/${transaction.hash}`
   }

   const startPayment = async event => {
     // new line
     // varvalue = await getETHPrice();
     // console.log(value);
 
     // console.log(location.state.fundneeded);
     console.log({ amount, destinationAddress })
 
     setError("")
     setTransaction(null)
 
     event.preventDefault()
 
     try {
       if (!window.ethereum) {
         throw new Error("No crypto wallet found. Please install it.")
       }
       await window.ethereum.send("eth_requestAccounts")
       const provider = new ethers.providers.Web3Provider(window.ethereum)
       const signer = provider.getSigner()
       const network = await provider.getNetwork()
       const transactionResponse = await signer.sendTransaction({
         to: destinationAddress,
 
         value: ethers.utils.parseEther(amount.toString())
       })
       transactionResponse.network = network
 
       console.log({ transactionResponse })
 
       // startPayment()
       // ...
       event.preventDefault()
 
       setError("") // clear previous error when a new transaction starts
 
       // ...
       console.log({ transactionResponse })
 
       setTransaction(transactionResponse) // new line
 
 
 
if(transactionResponse){
console.log("entered after if ");
console.log("entered after if ");
console.log("entered after if ");
   const formData = new FormData();
 
   formData.append('priceETH',amount );
console.log("amount",amount);
formData.append('adresseCrypto',destinationAddress );
console.log("adressecrypto",destinationAddress);

 

           dispatch(updateProjectFundRaised(currentUser.id,id.id,formData))
 
 
 }
        
     } catch (error) {
       console.log({ error })
 
       setError(error.message) // new line
     }
   }
 
   return (
     
     <>
       <div className="container">
       {/* added onChange and onClick attributes */}
       <div className="login-area pt-120 pb-120">
            <div className="container">
                  <div className="basic-login">
              <h3 className="text-center mb-60">Please enter how much you will donate</h3>
              <Form>
              <div className="form-group">
                      <label htmlFor="email">Amount</label>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        className="col-12 form-control mb-3"
                        onChange={event => {
                          setAmount(Number.parseFloat(event.target.value))
                          console.log(amount);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="amount">Crypto adress </label>
                      <Input
                       placeholder="Destination address"
                       value={destinationAddress}
                       className="col-12 form-control mb-3"
                   disabled
                      />
                    </div>
                    <button className="btn-border "  onClick={startPayment}>
         Send Payment
       </button>

               
            </Form>

        
 
       {transaction && (
         <div className="alert alert-success mt-3" role="alert">
           {/* {JSON.stringify(transaction)}
            */}
           Payment COmplete
           <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
             View Transaction
           </a>
         </div>
       )}
 
       {error && (
         <div className="alert alert-danger" role="alert">
           {JSON.stringify(error)}
         </div>
       )}
   
               </div>
            </div>
        </div>

 
      
     </div>
     </>

   )
};
export default Cryptotest;