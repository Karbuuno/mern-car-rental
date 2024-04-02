import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { registerCar } from "@/components/api/api";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "react-query";

export default function DialogForm() {
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

  const carCreateMutation = useMutation({
    mutationFn: registerCar,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["registerCar"] });
      // navigate("/");
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

    if (image) {
      formData.append("image", image);
    }
    carCreateMutation.mutate(formData);
    console.log(formData);
  };

  return (
    <>
      <div>
        <Dialog className=''>
          <DialogTrigger>
            <Button>Create Car </Button>
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
                      id='name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='model'>Model</Label>
                    <Input
                      id='model'
                      value={model}
                      onChange={e => setModel(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='number'>Price</Label>
                    <Input
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
                      type='number'
                      id='seats'
                      value={seats}
                      onChange={e => setSeats(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='doors'>Doors</Label>
                    <Input
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
                      id='carType'
                      value={carType}
                      onChange={e => setCarType(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='gear'>Gear</Label>
                    <Input
                      id='gear'
                      value={gear}
                      onChange={e => setGear(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                      id='location'
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor='fuel'>Fuel</Label>
                    <Input
                      id='fuel'
                      value={fuel}
                      onChange={e => setFuel(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
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
              <DialogFooter>
                <Button type='submit'>Create Car</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
