import { Component, type ReactNode } from "react";
import { Center, VStack, Heading, Text, Button, Code } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  // React automatically calls this the instant any component below ErrorBoundary in the tree
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  // Also auto-called by React, right after the error is caught — used here for logging to your
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center minH="100vh" px={4}>
          <VStack gap={4} textAlign="center" maxW="500px">
            <Heading size="xl">Something went wrong</Heading>
            <Text color="gray.500">
              Please refresh the page or try again later.
            </Text>

            {import.meta.env.DEV && this.state.error && (
              <Code
                p={3}
                rounded="md"
                fontSize="xs"
                whiteSpace="pre-wrap"
                textAlign="left"
                colorPalette="red"
              >
                {this.state.error.message}
              </Code>
            )}

            <Button
              colorPalette="purple"
              rounded="lg"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </VStack>
        </Center>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
