import "./Timer.css";

export default function Timer(
    {
        timer
    }
){
    return (
        <div className="table-card-timer">
            <h1>{timer}</h1>
        </div>
    )
}