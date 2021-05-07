import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import NumberFormat from 'react-number-format';
import {v4 as uuidv4} from 'uuid';

const Modal = ({ onClose = ()=> {}, children }) => {

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const uuid = uuidv4();

    function handleSubmit(e){
        e.preventDefault();        
        const data = {
            uuid,
            description,
            value,
            date
        } 
        if(localStorage.getItem('@dev.finance/transaction') == null){
            localStorage.setItem('@dev.finance/transaction', '[]');
        }
        if(description === '' || value === '' || date === ''){
            alert("Por favor preencha todos os dados")
        }else {
            const oldData = JSON.parse(localStorage.getItem('@dev.finance/transaction'));
            // push insere valores a um array
            oldData.push(data);

            localStorage.setItem('@dev.finance/transaction', JSON.stringify(oldData));
            window.location.reload();
        }
        
    }

    return(
       <div className="modal-overlay active">
           <div className="modal">
               <h2>Nova transação</h2>
               <form onSubmit={handleSubmit}>
                   <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Descrição"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                   </div>
                   <div className="input-group">
                        <NumberFormat
                            value={value}   
                            onChange={(e)=>setValue(e.target.value)} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            placeholder="R$ 0,00"
                            required
                        />
                        <small class="help">
                            Use sinal - (negativo) para despesas e , (vírgula) para casas decimais  
                        </small>
                   </div>
                   <div className="input-group">
                        <input 
                            type="date"  
                            onChange={(e)=>setDate(e.target.value)}
                            required
                        />
                   </div>
                   <div className="input-group actions">
                        <Link to="#" onClick={onClose} class="button cancel">Cancelar</Link>
                        <button onClick={handleSubmit}>Salvar</button>
                   </div>
               </form>
           </div>
       </div> 
    )
}

export default Modal;



    // // Formatando as datas para padrao BR
    // function DateFormated(date) {
    //     const parseDate = parseISO(date);
    //     const dateFormated = format(parseDate, 'dd/MM/yyyy') 
    
    // }