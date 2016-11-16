using System;
using System.Net;

namespace Microsoft.Bing.Search
{
    public class SearchApiException : Exception
    {
        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="SearchApiException" /> class
        /// </summary>
        public SearchApiException()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SearchApiException" /> class
        /// </summary>
        /// <param name="errorCode">Code represents the error category</param>
        /// <param name="errorMessage">Message represents the detailed error description</param>
        /// <param name="statusCode">Http status code</param>
        public SearchApiException(string errorCode, string errorMessage, HttpStatusCode statusCode)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            HttpStatus = statusCode;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets or sets the error code
        /// </summary>
        public string ErrorCode
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets the error message
        /// </summary>
        public string ErrorMessage
        {
            get; set;
        }

        /// <summary>
        /// Gets or sets http status of http response.
        /// </summary>
        /// <value>
        /// The HTTP status.
        /// </value>
        public HttpStatusCode HttpStatus
        {
            get; set;
        }
        #endregion
    }
}
