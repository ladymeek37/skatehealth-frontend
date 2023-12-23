
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css"

const EditPostPage = () => {
    
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image_url, setImage] = useState('');
    const [link, setLink] = useState('');

    const [user, token] = useAuth();

    const {tipId} = useParams();

    const [tip, setTip] = useState();


    useEffect(() => {
        getTip();
        
    }, [])



    async function getTip() {
        try{ 
            let response = await axios.get(`http://127.0.0.1:8000/api/tips/by_id/${tipId}/`, {
                headers: {
                    Authorization: "Bearer " + token,
            },
        });
        console.log("This is the tip", response)
        await setCategory(response.data[0].category)
        await setDate(response.data[0].date)
        await setTitle(response.data[0].title)
        await setText(response.data[0].text)
        await setLink(response.data[0].link)        
        // await setImage(response.data[0].image_url)
        setTip(response.data)

        return response
        } catch (error) {
            console.log("The api isn't working...", error.message)            
        }
    };

    let navigate = useNavigate();

    async function onSubmit(event) {

        event.preventDefault();

        let formData = new FormData()

        formData.append("category", category)
        formData.append("date", date)
        formData.append("title", title)
        formData.append("text", text)
        if (image_url){
            formData.append("image_url", image_url) // Adding the if conditional to see if the image exists. If not, we would append nothing.
        }
        formData.append("link", link)
    
        console.log(formData);
        await editTip(formData);
        navigate(-1 , {state: true})
    }


    async function editTip(tip) {

        try{
            let response = await axios.put(`http://127.0.0.1:8000/api/tips/${tipId}/`, tip, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data", // Add this in to indicate that we are sending in data with files.
                },
            })
            console.log("This is the response", response)
        } catch (error) {
            console.log("The api isn't working...", error.message)
        }
      };

    function imageFile(e) {
        setImage(e.target.files[0]);
    }



    return ( 
        <div className="pageparent">
        <form onSubmit = {onSubmit}>
            <div className="edittitletext">
                <legend><h1 className="editposttext">Edit Post for {user.username} : </h1></legend>
                    <br/>
                <div className= "mandatoryposttext">
                        * marks mandatory fields to fill out 
                </div>                
            </div>

            <br/>
            <div className="editpagechild">
                <div className="editfield">
                    <label>*Date:&nbsp;&nbsp;</label>
                    <input className="formdate" type = 'date' value = {date} onChange={(event) => setDate(event.target.value)}></input>               
                </div>  
                <br/>          
                <div className="editfield">
                    <label>*Title:&nbsp;&nbsp;</label>
                    <input className ="formtitle" type = 'string' value = {title} onChange={(event) => setTitle(event.target.value)}></input>                
                </div> 
                <br/>  
                <div className="editfield">
                    <label>*Text:&nbsp;&nbsp;</label>
                    <input className= "formtext" type = 'string' value = {text} onChange={(event) => setText(event.target.value)}></input>                
                </div>
                <br/>
                <div className="editfield">
                    <label>Image:&nbsp;&nbsp;</label>
                    <input
                    className="formimage"
                    type="file"
                    // value = {image_url} don't need to add this because the onchange event will take care of it
                    id="update-pic"
                    name="image_url"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => imageFile(e)}
                    />               
                </div>
                <br/>
                <div className="editfield">
                    <label> Link:&nbsp;&nbsp;&nbsp;</label>
                    <input className="formlink" type = 'url' id = 'postlink' name = 'postlink' value = {link} onChange={(event) => setLink(event.target.value)}></input>                
                </div>
                <br/>
                <br/>         
                <div className="editfield">
                    <label>*Category:&nbsp;&nbsp;</label>
                    {/* <input type = 'string' value = {category} onChange={(event) => setCategory(event.target.value)}></input> */}
                    <select 
                        name = 'category_options_name' 
                        id = 'category_options_id' 
                        value = {category} 
                        onChange={(event) => setCategory(event.target.value)}>
                            <option value="1">Yoga/Meditation</option>
                            <option value="2">Diet/Nutrition</option>
                            <option value="3">Lifestyle/Other</option>
                    </select>
                </div>
                <br/>
                <br/>
                <button className = "submitnewpost" type = 'submit'> Update Changes </button>                
            </div>



        </form>
        </div>
     );
}
 
export default EditPostPage;