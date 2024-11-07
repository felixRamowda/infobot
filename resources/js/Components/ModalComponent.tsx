import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/react";
import FormComponent from "./FormComponent";

export default function ModalComponent(){

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(

      <>

       <Button onPress={onOpen}>Add Product</Button>
      <Modal 
      backdrop="opaque"
      size="xl"
      isOpen={isOpen} onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
      scrollBehavior={"inside"}
      >
        
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
              <ModalBody
              
              >

                <FormComponent onClose={onClose} />
                
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> 
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
      </>
    );
}