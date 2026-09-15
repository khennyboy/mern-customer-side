import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useProductStore } from "../store/products-store";
import CheckoutForm from "./CheckoutForm";

const CheckoutDialog = () => {
  const cartDialog = useProductStore((state) => state.CartDialog);
  const setCartDialog = useProductStore((state) => state.setCartDialog);

  return (
    <Dialog.Root
      open={cartDialog}
      onOpenChange={(e) => setCartDialog(e.open)}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={4}>
          <Dialog.Content rounded={"2xl"} w={"full"} maxW={"420px"}>
            <Dialog.Header>
              <Dialog.Title>Customer Information</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                position="absolute"
                top="3"
                right="3"
                rounded={"lg"}
              />
            </Dialog.CloseTrigger>
            <Dialog.Body px={4}>
              <CheckoutForm />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CheckoutDialog;
