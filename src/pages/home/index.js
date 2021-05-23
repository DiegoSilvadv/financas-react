import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/modal';

import NumberString from 'number-string';
import currencyFormatter from 'currency-formatter';
import { format } from 'date-fns';

import './styles.css';
import Logo from '../../assents/logo.svg';
import { BiMoney } from 'react-icons/bi';
import { FiArrowUp, FiArrowDown, FiTrash } from 'react-icons/fi';

export default function Home() {
    let [modaisvisible, setModaIsVisible] = useState(false);

    const array = JSON.parse(localStorage.getItem('@dev.finance/transaction')) || []

    const [datas, setDatas] = useState(array);
    
    const [incomes, setIncomes] = useState('');
    const [expenses, setExpenses] = useState('');

    function RemoveStorage(data, index) {
        if (index >= 0) {
            datas.splice(index, 1);
            setDatas(data)
            localStorage.setItem('@dev.finance/transaction', JSON.stringify(datas))
            window.location.reload();
        }
    }

    function Expense(){
        let expenseValue = 0;
        array.forEach(data => {
            let numberValue = NumberString.toNumber(data.value)
            if(numberValue < 0 ){
                expenseValue += numberValue;
            }
        })
        setExpenses(expenseValue)
    }

    function Incomes(){
        let incomeValue = 0;
        array.forEach(data => {
            let numberValue = NumberString.toNumber(data.value);
            if(numberValue > 0){
                incomeValue += numberValue; 
            }
        })
        setIncomes(incomeValue)
    }

    useEffect(()=>{
        Expense();
        Incomes();
    })

    return (
        <div className="content">
            <header>
                <img src={Logo} alt="Logo" />
            </header>

            <main className="container">
                <section className="balance">
                    <div className="card incomes">
                        <h3>
                            <span>Entradas</span>
                            <FiArrowUp color="#3db804" size={25} />
                        </h3>
                        <p>{currencyFormatter.format(incomes, { locale: 'PT-br' })} </p>
                    </div>
                    <div className="card expenses">
                        <h3>
                            <span>Saídas</span>
                            <FiArrowDown color="#ca351b" size={25} />
                        </h3>
                        <p className="expenses">{currencyFormatter.format(expenses, { locale: 'PT-br' })}</p>
                    </div>
                    <div className="card total">
                        <h3>
                            <span>Total</span>
                            <BiMoney color="#fff" size={25} />
                        </h3>
                        <p>{currencyFormatter.format(expenses+incomes, { locale: 'PT-br' })}</p>
                    </div>
                </section>

                <section id="transaction">
                    <Link to="#" onClick={() => setModaIsVisible(true)}>
                        + Adicionar Transação
                    </Link>
                    <table id="data-table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datas.map((data, index) => {
                                    return (
                                        <tr key={data.uuid}>
                                            <td>{data.description}</td>
                                            {NumberString.toNumber(data.value) > 0 ? 
                                                <td className="incomes">{currencyFormatter.format(data.value, { locale: 'PT-br' })}</td> 
                                                : <td className="expenses">{currencyFormatter.format(data.value, { locale: 'PT-br' })}</td>
                                            }
                                            <td>{format(new Date(data.date), 'dd/MM/yyyy')}</td>
                                            <td>
                                                <button onClick={(e) => RemoveStorage(data, index)}>
                                                    <FiTrash color="#ca351b" size={25} />
                                                </button>
                                            </td>
                                        </tr>
                                    
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </section>

            </main>

            {modaisvisible ? (
                <Modal onClose={() => setModaIsVisible(false)}>

                </Modal>
            ) : null}
        </div>


    )
}

// onClick={RemoveStorage(data, index)} 