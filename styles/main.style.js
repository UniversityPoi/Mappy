import { StyleSheet } from "react-native";

const mainStyles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: '10%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  text: {
    textAlign: "center",
    color: '#FF5A5F',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  warningText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputText: {
    width: '80%',
    height: 40,
    borderRadius: 8,
    borderColor: '#FF5A5F',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#FF5A5F',
    marginTop: 20,
  },
  safeArea: {
    flex: 1, 
    backgroundColor: "azure"
  },
  stackScreenHeader: { 
    backgroundColor: "honeydew" 
  }
});

export default mainStyles;