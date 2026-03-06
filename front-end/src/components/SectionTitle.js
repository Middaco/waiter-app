import "./SectionTitle.css";

export default function SectionTitle({
    title
}){
    return(
        <div className="section-title-container">
            <span className="title">{title}</span>
            <div className="dashed-line"/>
        </div>
        
    )
}