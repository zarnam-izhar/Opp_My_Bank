#! /usr/bin/env node

import inquirer from "inquirer"

//bank account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance(): void
}

//bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    //Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} successful. Remaining balance is $${this.balance}`);
        } else {
            console.log("Insufficient balance.");
        }
        
    }
    //Credit money
    deposit(amount:number): void{
        if (amount > 100) {
            amount -= 1;
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    //check balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}

//customer class
class customer{
    firstName: string;
    lastName:string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName,
        this.lastName = lastName,
        this.gender = gender,
        this.age = age,
        this.mobileNumber = mobileNumber,
        this.account = account
        
    }
}

//create account
const accounts: BankAccount[] = [
    new BankAccount(1001,500),
    new BankAccount(1002,1000),
    new BankAccount(1003,2000),
];

//creat customers

const customers: customer[] = [
    new customer ("Zarnam","Izhar","Female",24, 3162389387, accounts[0]),
    new customer ("Ali","Sheikh","Male",28, 3162389308, accounts[1]),
    new customer ("Jannat","Ahmed","Female",22, 3002389357, accounts[2]),
]
//function to interact with bank account

async function service(){
    do{

        const accountnumberInput = await inquirer.prompt({
            name: "accountNumber",
            type:"number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountnumberInput.accountNumber)
            if(customer){
                console.log(`Welcome, ${customer.firstName} ${customer.lastName}`)
                const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
                switch(ans.select){
                    case "Deposit":
                        const depositAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"

                        })
                        customer.account.deposit(depositAmount.amount);
                        break;

                        case "Withdraw":
                            const withdrawAmount = await inquirer.prompt({
                                name: "amount",
                                type: "number",
                                message: "Enter the amount to withdraw:"
    
                            })
                            customer.account.withdraw(withdrawAmount.amount);
                            break;

                            case "Check Balance":
                                customer.account.checkBalance();
                                break;
                                case "Exit":
                                    console.log("Exiting bank program...");
                                    console.log("\nCome Again");
                                    return; 
                }
                
            }else{
                console.log("Invalid account number. Please try again.");
            }
        
    } while(true)
}
service()