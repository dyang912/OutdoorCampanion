import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {make_post} from "../database/posts";
import DateTimePicker from 'react-datetime-picker';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import Geocode from "react-geocode";
import {apikey} from "../env"

function NewPost({user, UName}) {
    const [posttext, makePost] = useState("");
    const [postTime, setTime] = useState(new Date());
    const [postLocation, setLocation] = useState([42.0451, -87.6877]);
    const [address, setAddress] = useState("")
    const [now, setOption] = useState("event");
    const navigate = useNavigate();

    const options = [
        {
            label: "Event",
            value: "event",
        },
        {
            label: "Question",
            value: "question",
        },
        {
            label: "Promotion",
            value: "promotion",
        },
        {
            label: "Miscellaneous",
            value: "miscellaneous",
        },
    ];

    const Markers = () => {
        useMapEvents({
            click(e) {
                Geocode.setApiKey(apikey);
                Geocode.fromLatLng(e.latlng.lat.toString(), e.latlng.lng.toString()).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        setAddress(address.toString());
                        console.log(address);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
                setLocation([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (
            <Marker
                key={postLocation[0]}
                position={postLocation}
                interactive={false}
            />
        )
    }

    return (
        <div>
            <form className = "new-post-form">
                <div className = "new-post mb-3">
                    <label htmlFor="formtext" className="form-label">What's on your mind?</label>
                    <input className="form-control" id="formtext" placeholder="Create a post" value={posttext}
                    onChange={(e) => makePost(e.target.value)} />
                </div>

                <div className = "post-category mb-3">
                    <label htmlFor="formcategory" className="form-label">Category</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="event"
                          onChange={(e) => {
                              setOption(e.target.value);
                          }}
                    >
                        <option>Select your category </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {now === "event" ? <div>
                        <label htmlFor="formtext" className="form-label">When will the event be held?</label>
                        <br/>
                    <div className="time">
                        <DateTimePicker onChange={setTime} value={postTime} />
                    </div>
                        <br/>

                        <label htmlFor="formtext" className="form-label">Where will the event be held?</label>
                        <div className="map">
                            <MapContainer center={postLocation} zoom={15} scrollWheelZoom={false} >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Markers/>
                            </MapContainer>
                        </div>
                    </div> : null }

                <label htmlFor="formtext" className="form-label">Want to share any pictures?</label>
                <input
                   className="form-control" name="files[] " id="files " type="file"
                />
                <div className="d-grid gap-3 col-3 mx-auto p-2">
                    <button type="button" className="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, now, navigate,
                                        document.getElementById("files ").files[0],
                                        postTime, postLocation, address.toString()) :
                               alert("please login!"); navigate('/login');
                    }}>post</button>
                </div>

            </form>
        </div>
    );
}

export default NewPost;
