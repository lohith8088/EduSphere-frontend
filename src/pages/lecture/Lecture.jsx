import React, { useState, useEffect } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lecture, setLecture] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const params = useParams();
  const navigate =useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if( user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
      setLecture(data.lecture);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error("Error fetching lecture:", error);
      setLecLoading(false);
    }
  }


  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm =new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const {data}=await axios.post(`${server}/api/course/${params.id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      toast.success(data.message || "Lecture uploaded successfully");
      setBtnLoading(false);
      setShow(false);
     
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPreview("");
      
    } catch (error) {
      toast.error(error.response.data.message || "Error uploading lecture");
      setBtnLoading(false);
    
      

      
    }
  }

  const deleteHandler = async (id) => {
    if(confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message || "Lecture deleted successfully");
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message || "Error deleting lecture");
      }
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  }

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="lecture-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : lecture && lecture.video ? (
              <>
                <div className="video-container">
                  <video
                    src={`${server}/${lecture.video}`}
                    controls
                    controlsList="nodownload noremoteplayback"
                    disableRemotePlayback
                    autoPlay
                  ></video>
                </div>
                <div className="lecture-info">
                  <h1>{lecture.title}</h1>
                  <p>{lecture.description}</p>
                </div>
              </>
            ) : (
              <div className="empty-lecture">
                <h1>Select a lecture to begin learning</h1>
              </div>
            )}
          </div>

          <div className="right">
            {user && user.role === "admin" && (
              <button 
                onClick={() => setShow(!show)} 
                className="common-btn admin-btn"
              >
                {show ? "Close Form" : "Add New Lecture"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Create New Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label>Lecture Title</label>
                  <input type="text" value={title}  onChange={(e) =>{setTitle(e.target.value)}} placeholder="Enter lecture title" required />
                  
                  <label>Description</label>
                  <textarea value={description}  onChange={(e) =>{setDescription(e.target.value)}}  placeholder="Add lecture description"></textarea>
                  
                  <label>Upload Video</label>
                  <input type="file" onChange={changeVideoHandler} accept="video/*" required />

                  {
                    videoPreview && (
                      <div className="video-preview">
                        <video src={videoPreview} controls alt="" width={300} />
                      </div>
                    )
                  }
                  
                  <button disabled={btnLoading} type="submit" className="common-btn">
                  { btnLoading ? "Saving..." : "Save Lecture" }
                  </button>
                </form>
              </div>
            )}

            <div className="lecture-list">
              <h3>Course Lectures</h3>
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={e._id} className="lecture-item">
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`lecture-number ${lecture && lecture._id === e._id ? "active" : ""}`}
                    >
                      <span>Lecture {i + 1}:</span> {e.title}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className="common-btn delete-btn"
                        onClick={() => {deleteHandler(e._id)}}
                     
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-lectures">No lectures available yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;