// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000000);

    expect(account.getBalance()).toBe(1000000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);

    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);

    expect(() => account1.transfer(100, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);

    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(40);

    expect(account.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(50);
    acc1.transfer(30, acc2);

    expect(acc1.getBalance()).toBe(70);
    expect(acc2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(42);
    const result = await account.fetchBalance();

    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(77);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError
    );
  });
});
