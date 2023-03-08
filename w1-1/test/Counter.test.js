const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { expect } = require('chai')

describe('Counter', function () {
    async function deployFixture() {
        const Counter = await ethers.getContractFactory('Counter')
        const counter = await Counter.deploy()

        return counter
    }

    describe('Deployment', async function () {
        it('should start with zero', async function () {
            const counter = await loadFixture(deployFixture)

            expect(await counter.get()).to.equal(0)
        })

        // it("Should set the right owner", async function () {
        //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

        //     expect(await lock.owner()).to.equal(owner.address);
        // });

        // it("Should receive and store the funds to lock", async function () {
        //     const { lock, lockedAmount } = await loadFixture(
        //         deployOneYearLockFixture
        //     );

        //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
        //         lockedAmount
        //     );
        // });

        // it("Should fail if the unlockTime is not in the future", async function () {
        //     // We don't use the fixture here because we want a different deployment
        //     const latestTime = await time.latest();
        //     const Lock = await ethers.getContractFactory("Lock");
        //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        //         "Unlock time should be in the future"
        //     );
        // });
    })

    describe('#add', async function () {
        context('can count correctly', function () {
            it('1+1+1', async function() {
                const counter = await loadFixture(deployFixture)

                await counter.add(1)
                await counter.add(1)
                await counter.add(1)

                expect(await counter.get()).to.equal(3)
            })

            it('2+1', async function() {
                const counter = await loadFixture(deployFixture)

                await counter.add(2)
                await counter.add(1)

                expect(await counter.get()).to.equal(3)
            })
        })
    })

    describe('#reset', async function() {
        it('should reset to zero', async function() {
            const counter = await loadFixture(deployFixture)

            expect(await counter.get()).to.equal(0)

            await counter.add(1)
            expect(await counter.get()).to.equal(1)

            await counter.reset()
            expect(await counter.get()).to.equal(0)
        })
    })
})
