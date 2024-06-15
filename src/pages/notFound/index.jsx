import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>

      <button onClick={() => navigate("/")}>点击跳转</button>
    </div>
  );
}

export default Home;
