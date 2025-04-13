import TableCard from "../components/TableCard";
import SectionTitle from "../components/SectionTitle";
import CreateTableButton from "../components/CreateTableButton";
import "./HomePage.css";
import { useOutletContext } from "react-router";

export default function HomePage() {

    const {tables, setTables} = useOutletContext();

    console.log("render home page")

    return (
      <div className="home-page-container">
        <SectionTitle title="Mese active" />
        <CreateTableButton 
          setTables={setTables}
        />
        <div className="list-of-tables">
          {tables.map(table => 
            <TableCard 
              key={table.id}
              id={table.id}
              tableName={table.name}
              noBarItems={table.noBarItems}
              noKitchenItems={table.noKitchenItems}
              timer={table.timer}
            />)}
        </div>
        <SectionTitle title="Mese inactive" />
      </div>
    
  );
}