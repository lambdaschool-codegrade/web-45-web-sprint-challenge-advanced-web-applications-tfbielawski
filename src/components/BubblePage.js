import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";


const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  //Use effect hook calls the fetchColorService Function
  useEffect(() => {
    fetchColorService()
    //Then sets the colors
    .then((res) => {
      console.log("COLORS >>", res.data)
      setColors(res);})

    //catch errors
    .catch((err) => {console.log(err);})
    //empty array to prevent endless calls
  }, []);

  
  const toggleEdit = (value) => {
    setEditing(value);
  };

  //Save edit function, pass in edit color
  const saveEdit = (editColor) => {
    axiosWithAuth()
      //call the api
      .put(`/api/colors/${editColor.id}`, editColor)
      .then(response => {
        console.log(response)
        //FindIndex of color
        let index = colors.findIndex((color) => color.id === editColor.id);
        colors[index] = editColor
        setColors([...colors])
      })
      //Catch errors
      .catch((error) => {console.log(error); })
  };

  //Delete color function
  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      //call the api
      .delete(`/api/colors/${colorToDelete.id}`)
      //filter the color to be deleted
      .then(() => {
        setColors(colors.filter(color => color.id !== colorToDelete.id))
      })
      //Catch errors
      .catch(error => {console.log(error); })
  };

  
  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;


//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
