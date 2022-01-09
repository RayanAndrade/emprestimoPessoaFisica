import './loanForm.css';

function loanForm() {
    return (
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
                    />

                    <select 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="UF" 
                        type="text" 
                        placeholder="UF"
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
                    />

                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="loanValue" 
                        type="text" 
                        placeholder="Valor do empréstimo"
                    />

                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="monthValueToPay" 
                        type="text" 
                        placeholder="Valor a pagar por mês"
                    />

                    <button class="bg-yellow-500 hover:bg-yellow-600 text-base hover:text-lg ease-in duration-100 text-white font-bold py-2 px-4 rounded w-full">
                        Somar
                    </button>
                </div>

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
                            <tr class="border-b-2">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>

                    <button class="bg-green-500 hover:bg-green-700 text-base hover:text-lg ease-in duration-100 text-white font-bold py-2 px-4 rounded w-full">
                        Ok!
                    </button>
                </div>

            </body> 
        </div>
    );
}

export default loanForm;
