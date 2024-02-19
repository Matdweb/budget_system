import { Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddNewTourQuestionnaire from "./AddNewTourQuestionnaire";

function AddNewTourFooter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <footer className='bg-[#959595] fixed bottom-0 w-full h-28 flex justify-center items-center'>
        <Text
          onClick={onOpen}
          fontSize='2xl'
          className='outline outline-2 px-4 py-2 outline-[#5d5d5d] rounded-md active:scale-95 transition-all duration-75 cursor-pointer select-none'
        >
          + Añadir gira
        </Text>
      </footer>
      <AddNewTourQuestionnaire isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default AddNewTourFooter