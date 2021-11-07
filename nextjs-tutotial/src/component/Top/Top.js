import { Header } from "semantic-ui-react";
import Gnb from "../Gnb/Gnb";


export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <div style={{ flex: "100px 0 0" }}>
          <img
            src=""
            alt="logo"
            style={{ display: "block", width: 80 }}
          />
        </div>
        <Header as="h1">코딩앙마</Header>
      </div>
      <Gnb/>
    </div>
  );
}
