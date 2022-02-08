import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {make_post} from "../database/posts";
import DateTimePicker from 'react-datetime-picker';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import Geocode from "react-geocode";
import {apikey} from "../env"

function NewPost({ user, UName, UEmail, uid }) {
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
            label: "Experience",
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

                { now === "event" ?
                    <div>
                        <label htmlFor="formtext" className="form-label">When will the event be held?</label>
                        <div className="time">
                            <DateTimePicker onChange={setTime} value={postTime} />
                        </div>

                        <label htmlFor="formtext" className="form-label mt-3">Where will the event be held? {address ? "("+address+")":null}</label>
                        <div className="map">
                            <MapContainer center={postLocation} zoom={15} scrollWheelZoom={false} >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Markers/>
                            </MapContainer>
                        </div>
                    </div> : null }

                <div className="mt-3">
                    <label htmlFor="formtext" className="form-label">Want to share any pictures? (Optional)</label>
                    <input className="form-control" name="files[] " id="files " type="file" />
                </div>

                <div className="d-grid gap-3 col-3 mx-auto p-2 mt-3">
                    <button type="button" className="btn btn-outline-dark" onClick={() => {
                        user ? make_post(posttext, UName, UEmail, now, navigate,
                                        document.getElementById("files ").files[0],
                                        postTime, address, uid) :
                                (() => {alert("please login!"); navigate('/login');})()
                    }}>Post</button>
                </div>

            </form>
        </div>
    );
}

export default NewPost;
