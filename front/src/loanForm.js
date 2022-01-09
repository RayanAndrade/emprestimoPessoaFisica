import React, { useState } from 'react';
import './loanForm.css';
import Swal from 'sweetalert2';
import axios from "axios";
const { FormatMoney } = require('format-money-js');
const fm = new FormatMoney({
    decimals: 2
});

const LoanForm = () => {
    
    const [aprovedSimulation, setAprovedSimulation] = useState(false);
    const [cpf, setCpf] = useState('');
    const [uf, setUf] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [loanValue, setLoanValue] = useState('');
    const [monthValueToPay, setMonthValueToPay] = useState('');
    const [_summary, setSummary] = useState({});
    const [_installments, setInstallments] = useState([]);

    const submit = () => {
        
        if(cpf && uf && birthdate && loanValue && monthValueToPay){

            const api = axios.create({
                baseURL: "https://emprestimo-letalk.herokuapp.com",
                validateStatus: false
            });

            api
            .get(`getSimulation/${cpf}/${uf}/${birthdate}/${loanValue}/${monthValueToPay}`)
            .then((response) => {

                const {status} = response;

                if(status === 200){
                    console.log(response.status)
                    const {summary, installments} = response.data;
                    
                    setSummary(summary);
                    setInstallments(installments);

                    setAprovedSimulation(true);
                }else{

                    const {MSG} = response.data;

                    Swal.fire({
                        title: 'Error',
                        text: MSG,
                        icon: 'error',
                        confirmButtonText: 'Ok, vou corrigir os valores!'
                    });

                    setAprovedSimulation(false);
                }
            })


        }else{
            Swal.fire({
                title: 'Error',
                text: 'Por favor, preencha todos os campos antes de pedir por uma simulação',
                icon: 'error',
                confirmButtonText: 'Pode deixar!'
            });
        }
    }

    return(
        <div className="loanForm">
                <body class="p-3 min-h-screen">

                    <div className="h-1/6">
                        <h1 class="text-5xl py-8 font-thin text-slate-400">Simule e solicite o seu empréstimo.</h1>
                        <small class="text-base font-bold">Preencha o formulário abaixo para simular</small>
                    </div>

                    <div class="h-4/6 w-4/6 mx-auto box-content border bg-white rounded shadow-md px-3 pt-12 pb-3 my-4 space-y-4">
                        <input 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="cpf" 
                            type="text" 
                            placeholder="CPF"
                            onChange={e => setCpf(e.target.value)}
                        />

                        <select 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="UF" 
                            type="text" 
                            placeholder="UF"
                            onChange={e => setUf(e.target.value)}
                        >
                            <option disabled selected value hidden>UF</option>
                            <option value="MG">MG</option>
                            <option value="SP">SP</option>
                            <option value="RJ">RJ</option>
                            <option value="ES">ES</option>
                        </select>

                        <input 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="birthdate" 
                            type="text"
                            placeholder="Data de nascimento"
                            onChange={e => setBirthdate(e.target.value)}
                        />

                        <input 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="loanValue" 
                            type="text" 
                            placeholder="Valor do empréstimo"
                            onChange={e => setLoanValue(e.target.value)}
                        />

                        <input 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="monthValueToPay" 
                            type="text" 
                            placeholder="Valor a pagar por mês"
                            onChange={e => setMonthValueToPay(e.target.value)}
                        />

                        <button onClick={submit} class="bg-yellow-500 hover:bg-yellow-600 text-base hover:text-lg ease-in duration-100 text-white font-bold py-2 px-4 rounded w-full">
                            SIMULAR
                        </button>
                    </div>

                    <div className={`${aprovedSimulation ? 'block' : 'hidden'}`}>

                        <div className="h-1/6 pt-6">
                            <small class="text-base font-bold">Veja a simulação para o seu empréstimo antes de efetivar</small>
                        </div>

                        <div class="h-4/6 w-4/6 mx-auto box-content border bg-white rounded shadow-md px-3 pt-12 pb-3 my-4 space-y-4 text-left">
                            
                            <div class="grid grid-cols-3">
                                
                                <div class="p-2">
                                    <div class="text-slate-400 text-sm font-bold">VALOR REQUERIDO:</div>
                                    <div class="font-bold text-xl hover:text-2xl ease-in duration-100">$50,00</div>
                                </div>
                                
                            </div>

                            <table class="w-full">
                                <thead class="border-b-2">
                                    <tr>
                                        <th>SALDO DEVEDOR</th>
                                        <th>JUROS</th>
                                        <th>SALDO DEVEDOR AJUSTADO</th>
                                        <th>VALOR DA PARCELA</th>
                                        <th>VENCIMENTO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        _installments.map(installment => {
                                            const {balanceDue, fee, newBalanceDue, installmentValue, deadline} = installment;

                                            return(
                                                <tr class="border-b-2">
                                                    <td>{fm.from(balanceDue, { symbol: 'R$' })}</td>
                                                    <td>{fm.from(fee, { symbol: 'R$' })}</td>
                                                    <td>{fm.from(newBalanceDue, { symbol: 'R$' })}</td>
                                                    <td>{fm.from(installmentValue, { symbol: 'R$' })}</td>
                                                    <td>{deadline}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <button class="bg-green-500 hover:bg-green-700 text-base hover:text-lg ease-in duration-100 text-white font-bold py-2 px-4 rounded w-full">
                                EFETIVAR O EMPRÉSTIMO →
                            </button>
                        </div>
                    </div>


                </body> 
            </div>
    )

};


export default LoanForm