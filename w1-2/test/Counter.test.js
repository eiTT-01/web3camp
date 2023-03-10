const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { expect } = require('chai')

describe('Counter', function () {
    let accounts

    async function deployFixture() {
        accounts = await ethers.getSigners()

        const Counter = await ethers.getContractFactory('Counter')
        const counter = await Counter.connect(accounts[0]).deploy()

        return counter
    }

    describe('Deployment', async function () {
        it('should start with zero', async function () {
            const counter = await loadFixture(deployFixture)

            expect(await counter.get()).to.equal(0)
        })
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

    describe('#count', async function() {
        it('should be ok when the caller is owner', async function() {
            const counter = await loadFixture(deployFixture)

            expect(await counter.get()).to.equal(0)

            await counter.connect(accounts[0]).count()

            expect(await counter.get()).to.equal(1)
        })

        it('throw when the caller is not owner', async function() {
            const counter = await loadFixture(deployFixture)

            expect(await counter.get()).to.equal(0)

            expect(counter.connect(accounts[1]).count()).to.be.revertedWith('permission denied')
        })
    })
})
