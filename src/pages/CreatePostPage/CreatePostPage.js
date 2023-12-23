import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePostPage.css"

const CreatePostPage = (props) => {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image_url, setImage] = useState('');
    const [link, setLink] = useState('');

    const [user, token] = useAuth();

    let navigate = useNavigate();

    async function onSubmit(event) {

        event.preventDefault();

        let formData = new FormData()

        formData.append("category", category)
        formData.append("date", date)
        formData.append("title", title)
        formData.append("text", text)
        formData.append("image_url", image_url)
        formData.append("link", link)
    

        await sendPost(formData)
        console.log(formData);
        navigate('/', {state: true})
    }

    async function sendPost(newPost) {

        try{
            let response = await axios.post('http://127.0.0.1:8000/api/tips/', newPost, {
                headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
            }, 
            })
            console.log("This is the response",response)

        } catch (error) {
            console.log("The api isn't working...", error.message)
        }

    }

    function imageFile(e) {
        setImage(e.target.files[0]);
    }
    ;
    
    return(
        <div className="pageparent">
        <form onSubmit = {onSubmit}>
            <legend><h1 className="newposttext" >New Post for {user.username} : </h1></legend>
                <div className="mandatorytext field">
                    * marks mandatory fields to fill out 
                </div>
            <div className="pagechild">
                <div className="field">
                    <label>*Date:&nbsp;&nbsp;</label>
                    <input className="formdate" type = 'date' value = {date} onChange={(event) => setDate(event.target.value)}></input>               
                </div>  
                <br/>          
                <div className="field">
                    <label>*Title:&nbsp;&nbsp;</label>
                    <input className ="formtitle" type = 'string' value = {title} onChange={(event) => setTitle(event.target.value)}></input>                
                </div> 
                <br/>  
                <div className="field">
                    <label>*Text:&nbsp;&nbsp;</label>
                    <input className= "formtext" type = 'string' value = {text} onChange={(event) => setText(event.target.value)}></input>                
                </div>
                <br/>         
                <div className="field">
                    <label>Image:&nbsp;&nbsp;</label>
                    <input
                    className="formimage"
                    type="file"
                    // value = {image_url}
                    id="update-pic"
                    name="image_url"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => imageFile(e)}
                    />               
                </div>
                <br/>
                <div className="field" >
                    <label> Link: &nbsp;&nbsp;&nbsp;</label>
                    <input className="formlink" type = 'url' id = 'postlink' name = 'postlink' value = {link} onChange={(event) => setLink(event.target.value)}></input>                
                </div>
                <br/>
                <br/>
                <div className="field">
                    <label className="categorytext">*Category:&nbsp;&nbsp;</label>
                    {/* <input type = 'string' value = {category} onChange={(event) => setCategory(event.target.value)}></input> */}
                    <select 
                        name = 'category_options_name' 
                        id = 'category_options_id' 
                        multiple = 'multiple' 
                        value = {category} 
                        onChange={(event) => setCategory(event.target.value)}>
                            <option value="1">Yoga/Meditation</option>
                            <option value="2">Diet/Nutrition</option>
                            <option value="3">Lifestyle/Other</option>
                    </select>
                </div>
                <br/>
                <br/>
                <button className = "submitnewpost" type = 'submit'> Submit Post </button>               
            </div>
            <br/>
  
        </form>            
        </div>

    )

}

export default CreatePostPage;

