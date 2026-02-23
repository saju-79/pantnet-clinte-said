import AddPlantForm from '../../../components/Form/AddPlantForm'

const AddPlant = () => {
  const  handleAddPlantData = (e) => {
      e.preventDefault();
    console.log(e.target, "data")
  }
  return (
    <div>
      {/* Form */}
      <AddPlantForm  handleAddPlantData={ handleAddPlantData}/>
    </div>
  )
}

export default AddPlant
