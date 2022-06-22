import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';
import Input from './Input';

const ExpenseForm = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultValues,
}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier, enteredText) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredText, isValid: true },
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid Input', 'Please check your inputs');
            setInputs((curInputValues) => {
                return {
                    amount: {
                        value: curInputValues.amount.value,
                        isValid: amountIsValid,
                    },
                    date: {
                        value: curInputValues.date.value,
                        isValid: dateIsValid,
                    },
                    description: {
                        value: curInputValues.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label='Amount'
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    label='Date'
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                />
            </View>

            <Input
                label='Description'
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value,
                    //autoCorrect: false, // default is true
                    //autoCapitalize: 'sentences',
                }}
                invalid={!inputs.description.isValid}
            />

            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input values - please check your entered data!
                </Text>
            )}

            <View style={styles.buttons}>
                <Button mode='flat' onPress={onCancel} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 10,
    },
});
