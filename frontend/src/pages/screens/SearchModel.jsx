import React from "react";
import Search from "./Search";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function SearchModel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='bg-blue-500 p-5 text-white text-lg m-2'
        >
          View Deal
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] md:w-[700px] lg:w-[900px] bg-blue-100'>
        <Search />
      </DialogContent>
    </Dialog>
  );
}

export default SearchModel;
