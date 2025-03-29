import { useEffect } from "react";
import TableCard from "../components/TableCard";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import CreateTableButton from "../components/CreateTableButton";
import "./HomePage.css";

export default function HomePage() {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetch('/api/tables')
            .then(response => response.json())
            .then(data => setTables(data.tables));
    }, []);

    return (
      <div className="home-page-container">
        <SectionTitle title="Mese active" />
        <CreateTableButton 
          setTables={setTables}
        />
        <div className="list-of-tables">
          {tables.map(table => 
            <TableCard 
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