import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF5A5F',
    borderRadius: 20,
    padding: "15%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    color: '#FF5A5F',
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
});

export default styles;


