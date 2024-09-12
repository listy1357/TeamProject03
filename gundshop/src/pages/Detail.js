import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function Detail(props) {

    let {id} = useParams();
    let 찾은상품 = props.MG.find( x => x.id == id);
    let [ count, setCount ] = useState(0)
    let [ alert, setalert ] = useState(true)
   
  
    useEffect(()=>{
        let a = setTimeout(()=>{ setalert(false) }, 2000)
        return ()=> {
            clearTimeout(a)
        }
    }, [])

    


    return (
        <div className="container">   
            {
                alert == true
                ? <div className="alert alert-warning">
                2초이내 구매시 할인
                </div>
                : null
            }
            {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button>         
            <div className="row">
             <div className="col-md-6">
                <img src={process.env.PUBLIC_URL + '/images/mg1.jpg'} width="100%"/>
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{찾은상품.gundam_series}</h4>
                <p>{찾은상품.gundam_name}</p>
                <p>{찾은상품.price}</p>
                <button className="btn btn-danger">주문하기</button> 
             </div>
           </div>
        </div> 
    )
}
export default Detail