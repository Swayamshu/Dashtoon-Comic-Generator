import { BrowserRouter as Router, Routes, Switch, Link, Route } from "react-router-dom"
import { Layout , Comic} from "./components"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/mycomics" element={<Comic />} />
        </Routes>
      </Layout>  
    </Router>
  );
}

export default App;
