// ReSharper disable InconsistentNaming

namespace MockExamples
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Interfaces;
    using Moq;
    using NUnit.Framework;
    using SomeServices;

    public class MembershipServiceTests
    {
        private readonly Mock<IDatabaseContext> mock;

        public MembershipServiceTests()
        {
            mock = new Mock<IDatabaseContext>();
        }

        [Test]
        public void IfUserNotFound_ThrowArgumentExeption()
        {
            // arrange
            mock
                .Setup(x => x.Query<User>())
                .Returns(new List<User>().AsQueryable());

            var membershipService = new MembershipService(mock.Object);

            // act
            // assert  
            Assert.Throws<ArgumentException>(
                () => membershipService.FindContextUser(1));
        }

        [Test]
        public void IfUserFound_ReturnFoundUser()
        {
            // arrange
            mock
                .Setup(x => x.Query<User>())
                .Returns(new List<User> { new User() { Id = 1 } }.AsQueryable());

            var membershipService = new MembershipService(mock.Object);

            // act
            var user = membershipService.FindContextUser(1);
            
            // assert  
            Assert.NotNull(user);
            Assert.AreEqual(1, user.Id);
        }

        class StubDatabaseContext : IDatabaseContext
        {
            private List<User> users;

            public StubDatabaseContext(params User[] users)
            {
                this.users = users.ToList();
            }

            public IQueryable<T> Query<T>()
            {
                return (IQueryable<T>) users.AsQueryable();
            }
        }

        [Test]
        public void Stub_IfUserNotFound_ThrowArgumentExeption()
        {
            // arrange
            var membershipService = new MembershipService(new StubDatabaseContext());

            // act
            // assert  
            Assert.Throws<ArgumentException>(
                () => membershipService.FindContextUser(1));
        }

        [Test]
        public void Stub_IfUserFound_ReturnFoundUser()
        {
            // arrange
            var membershipService = new MembershipService(new StubDatabaseContext(new User { Id = 1 }));

            // act
            var user = membershipService.FindContextUser(1);

            // assert  
            Assert.NotNull(user);
            Assert.AreEqual(1, user.Id);
        }

        // тест на поведение
        [Test]
        public void IfUserSearchRequested_CallQuery()
        {
            // arrange
            mock.ResetCalls();
            mock
                .Setup(x => x.Query<User>())
                .Returns(new List<User> { new User() { Id = 1 } }.AsQueryable());

            var membershipService = new MembershipService(mock.Object);

            // act
            var user = membershipService.FindContextUser(1);

            // assert
            mock.Verify(x => x.Query<User>(), Times.Once);
        }
    }
}