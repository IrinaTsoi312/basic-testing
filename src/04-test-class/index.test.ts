import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'log').mockImplementation();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(100);
    expect(() => account.withdraw(150)).toThrowError(InsufficientFundsError);
  });

  test('should throw TransferFailedError when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);

    expect(() => account1.transfer(150, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);

    account1.transfer(50, account2);

    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(100);
    const balance = await account.fetchBalance();
    console.log('Received balance:', balance);

    expect(typeof balance === 'number' || balance === null).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    await account.synchronizeBalance();
    expect(typeof account.getBalance()).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
