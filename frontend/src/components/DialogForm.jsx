import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCar, registerCar, updateCar } from "@/components/api/api";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DialogForm({ carToEdit, buttonTitle }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [carType, setCarType] = useState("");
  const [gear, setGear] = useState("");
  const [location, setLocation] = useState("");
  const [fuel, setFuel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const QueryClient = useQueryClient();

  const isEditing = carToEdit != null;

  useEffect(() => {
    if (isEditing) {
      setName(carToEdit.name);
      setModel(carToEdit.model);
      setRegNumber(carToEdit.regNumber);
      setPrice(carToEdit.price);
      setSeats(carToEdit.seats);
      setDoors(carToEdit.doors);
      setCarType(carToEdit.carType);
      setGear(carToEdit.gear);
      setLocation(carToEdit.location);
      setImage(carToEdit.image);
      setFuel(carToEdit.fuel);
      setDescription(carToEdit.description);
    }
  }, [carToEdit]);

  const carCreateMutation = useMutation({
    mutationFn: registerCar,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
  const carUpdateMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log(data);
    },
  });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model);
    formData.append("regNumber", regNumber);
    formData.append("price", price);
    formData.append("seats", seats);
    formData.append("doors", doors);
    formData.append("carType", carType);
    formData.append("gear", gear);
    formData.append("fuel", fuel);
    formData.append("location", location);
    formData.append("description", description);
    try {
      if (image) {
        formData.append("image", image);
      }
      let response;
      if (isEditing) {
        response = await axios.put(`/api/cars/${carToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // carUpdateMutation.mutate({ _id: carToEdit._id, formData: formData });
      } else {
        carCreateMutation.mutate(formData);
      }
      console.log(carToEdit);

      setName("");
      setModel("");
      setRegNumber("");
      setPrice("");
      setSeats("");
      setDoors("");
      setCarType("");
      setGear("");
      setLocation("");
      setFuel("");
      setDescription("");
      navigate("/cars/admin/carlist");
    } catch (error) {
      console.error("Car operation error", error);
    }
  };

  return (
    <>
      <div>
        <Dialog className=''>
          <DialogTrigger className='m-5'>
            {buttonTitle ? (
              <span>{<MdEdit className='text-2xl' />}</span>
            ) : (
              <span className='p-2 font-bold shadow bg-black rounded-md text-white'>
                Create Car
              </span>
              //   "{Create a Car"
            )}
          </DialogTrigger>
          <DialogContent className='w-[850px]'>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className=' flex flex-row w-[800px] space-x-4 py-2'>
                <div>
                  <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      required
                      id='name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='model'>Model</Label>
                    <Input
                      required
                      id='model'
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='number'>Price</Label>
                    <Input
                      required
                      type='number'
                      id='price'
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='number'>RegNumber</Label>
                    <Input
                      id='number'
                      value={regNumber}
                      onChange={e => setRegNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='seats'>Seats</Label>
                    <Input
                      required
                      type='number'
                      id='seats'
                      value={seats}
                      onChange={e => setSeats(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='doors'>Doors</Label>
                    <Input
                      required
                      type='number'
                      id='doors'
                      value={doors}
                      onChange={e => setDoors(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Label htmlFor='carType'>CarType</Label>
                    <Input
                      required
                      id='carType'
                      value={carType}
                      onChange={e => setCarType(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='gear'>Gear</Label>
                    <Input
                      required
                      id='gear'
                      value={gear}
                      onChange={e => setGear(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                      required
                      id='location'
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor='fuel'>Fuel</Label>
                    <Input
                      required
                      id='fuel'
                      value={fuel}
                      onChange={e => setFuel(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      required
                      id='description'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Label htmlFor='image'>Image</Label>
                    <Input
                      type='file'
                      id='image'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt='Preview'
                        className='mt-4 w-[400px] h-[400px]'
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* <DialogFooter type='submit'>Submit</DialogFooter> */}
              <div className='font-bold flex justify-center '>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
