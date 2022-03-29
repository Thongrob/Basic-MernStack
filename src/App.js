import NavbarComponent from "./components/NavbarComponent"
import axios from "axios"
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"


function App() {
  //สร้าง State สำหรับอ่านข้อมูลทั้งหมด
  const [blogs,setBlogs] = useState([])
  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="container p-5">
      <NavbarComponent/>

    {blogs.map((blog,index)=>(
      <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
        <div className="col pt-3 pb-2">
          <Link to={`/blog/${blog.slug}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>{blog.content.substring(0,250)}</p>
          <p className="text-muted">ผู้เขียน: {blog.author} เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>

      </div>
    ))}

    {/* ทดสอบอ่านข้อมูลทั้งหมด */}
    {/* {JSON.stringify(blogs)} */}
    </div>
  );
}

export default App;
