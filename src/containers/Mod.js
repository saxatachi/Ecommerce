import React from 'react';

const Delivery = (props) => {
    console.log(props.value)
    const closeModal = () =>{
        props.setmodal(false)
    }
    return (
        
        <div className="itemcontainer__delivery">
            <div className="itemcontainer__delivery__container">
                <div className="itemcontainer__delivery__container-title">
                    {props.value === 1 && <h1>Bezpłatna dostawa przy zamówieniach powyżej 110 ZŁ</h1>}
                    {props.value === 2 && <h1>Nie będzie Cię w domu? Skorzystaj z usługi przekierowania paczki UPS</h1>}
                    {props.value === 3 && <h1>Darmowa wymiana – właściwy rozmiar za każdym razem!</h1>}
                    
                </div>
                <div className="itemcontainer__delivery__container-close">
                    <i onClick={closeModal} class="fa fa-times-circle fa-3x" aria-hidden="true"></i>
                </div>
                <div className="itemcontainer__delivery__container-paragraph">
                    {props.value === 1 &&<p> Wydaj ponad 110zt i skorzystaj z DARMOWEJ dostawy!Aby dowiedzieć się więcej, odwiedź strony z pomocą, na których znajdziesz odpowiedzi na często zadawane pytania dotyczące dostawy i zwrotów.</p>}
                    {props.value === 2 &&<p>Otrzymałeś informację o przesyłce i już wiesz, że nie będzie Cię w domu, kiedy dotrze? Przekieruj ją w ostatniej chwili do jednego z pobliskich punktów odbioru UPS. Możesz to zrobić nawet na godzinę przed planowanym dostarczeniem przesyłki!</p>}
                    {props.value === 3 &&<p> Po przymiarce chcesz wybrać inny rozmiar? Żaden problem. Mamy darmową wymianę! Skontaktuj się z działem obsługi klienta, aby dowiedzieć się, jak szybko i łatwo możesz to zrobić. Pamiętaj, że od momentu otrzymania przesyłki masz 30 dni na dokonanie wymiany zamówionych rzeczy.Chcesz wiedzieć więcej? Odwiedź naszą stronę poświęconą wymianom.</p>}
                </div>
            </div>
        </div>
    );
};

export default Delivery;