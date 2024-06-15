import "./index.less";

export default function DashboardPage() {
  function onFileChange(e) {
    console.log(e.target.files);
  }

  return (
    <div className="dashboardContainer">
      <input type="file" className="fileInput" onChange={onFileChange} />
    </div>
  );
}
