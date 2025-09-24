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
        [Test]
        public void IfUserNotFound_ThrowArgumentExeption()
        {
            // arrange
            
            // act
            // assert  
        }

        [Test]
        public void IfUserFound_ReturnFoundUser()
        {
            // arrange

            // act

            // assert  
        }

        class StubDatabaseContext : IDatabaseContext
        {
            public IQueryable<T> Query<T>()
            {
                throw new NotImplementedException();
            }
        }

        [Test]
        public void Stub_IfUserNotFound_ThrowArgumentExeption()
        {
            // arrange
            
            // act
            // assert  
        }

        [Test]
        public void Stub_IfUserFound_ReturnFoundUser()
        {
            // arrange

            // act

            // assert  
        }

        // тест на поведение
        [Test]
        public void IfUserSearchRequested_CallQuery()
        {
            // arrange

            // act
            
            // assert
        }
    }
}